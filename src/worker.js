// Cloudflare Worker — only /api/* reaches this code (see run_worker_first in
// wrangler.jsonc). Everything else is served straight from public/ as before.
//
// Stage 1: Google sign-in, mobile number, and progress sync to D1.
import { mergeState, mergeLog } from "./merge.js";

const SESSION_DAYS = 180;
const MAX_STATE = 512 * 1024;

const SCHEMA_SQL = [
  `CREATE TABLE IF NOT EXISTS users (
     id TEXT PRIMARY KEY, email TEXT, name TEXT, gname TEXT, picture TEXT,
     phone TEXT, consent_at INTEGER, board INTEGER NOT NULL DEFAULT 0,
     created_at INTEGER NOT NULL, last_seen INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS sessions (
     token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL,
     created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS states (
     user_id TEXT PRIMARY KEY, json TEXT NOT NULL, updated_at INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS activity (
     user_id TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, p INTEGER NOT NULL DEFAULT 0,
     PRIMARY KEY (user_id, day))`,
  `CREATE INDEX IF NOT EXISTS activity_day ON activity (day)`,
  `CREATE INDEX IF NOT EXISTS sessions_user ON sessions (user_id)`,
];

let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch(SCHEMA_SQL.map((q) => db.prepare(q)));
  schemaReady = true;
}

/* ── helpers ─────────────────────────────────────────── */
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});
const fail = (status, code) => json({ error: code }, status);
const now = () => Date.now();
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4)), (c) => c.charCodeAt(0));
const sha256 = async (s) => b64u(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));

async function body(req) {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > MAX_STATE) throw new Error("too_large");
  const text = await req.text();
  if (text.length > MAX_STATE) throw new Error("too_large");
  return text ? JSON.parse(text) : {};
}

/* ── Google ID token check ───────────────────────────── */
let jwks = null, jwksAt = 0;
async function googleKeys(force) {
  if (!force && jwks && now() - jwksAt < 3600e3) return jwks;
  const r = await fetch("https://www.googleapis.com/oauth2/v3/certs");
  if (!r.ok) throw new Error("jwks");
  jwks = (await r.json()).keys; jwksAt = now();
  return jwks;
}

async function verifyGoogle(token, clientId) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) throw new Error("bad_token");
  const header = JSON.parse(new TextDecoder().decode(unb64u(parts[0])));
  const claims = JSON.parse(new TextDecoder().decode(unb64u(parts[1])));
  if (header.alg !== "RS256") throw new Error("bad_alg");
  let key = (await googleKeys()).find((k) => k.kid === header.kid);
  if (!key) key = (await googleKeys(true)).find((k) => k.kid === header.kid);
  if (!key) throw new Error("unknown_key");
  const pub = await crypto.subtle.importKey("jwk", key, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", pub, unb64u(parts[2]), new TextEncoder().encode(parts[0] + "." + parts[1]));
  if (!ok) throw new Error("bad_sig");
  const t = Math.floor(now() / 1000);
  if (claims.aud !== clientId) throw new Error("bad_aud");
  if (!["accounts.google.com", "https://accounts.google.com"].includes(claims.iss)) throw new Error("bad_iss");
  if (!claims.exp || claims.exp < t - 60) throw new Error("expired");
  if (!claims.sub) throw new Error("no_sub");
  return claims;
}

/* ── sessions ────────────────────────────────────────── */
async function newSession(db, userId) {
  const raw = b64u(crypto.getRandomValues(new Uint8Array(32)));
  const t = now();
  await db.prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)")
    .bind(await sha256(raw), userId, t, t + SESSION_DAYS * 864e5).run();
  return raw;
}

async function currentUser(req, db) {
  const m = (req.headers.get("authorization") || "").match(/^Bearer (.+)$/);
  if (!m) return null;
  const row = await db.prepare(
    "SELECT u.*, s.token_hash FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?",
  ).bind(await sha256(m[1]), now()).first();
  return row || null;
}

const publicUser = (u) => ({
  name: u.name || u.gname || "", email: u.email || "", picture: u.picture || "",
  phone: u.phone || "", board: !!u.board, consent: !!u.consent_at,
});

// Indian numbers by default: 10 digits starting 6–9 → +91…; others need +country code
function cleanPhone(p) {
  const d = String(p || "").replace(/[\s\-()]/g, "");
  if (/^[6-9]\d{9}$/.test(d)) return "+91" + d;
  if (/^0[6-9]\d{9}$/.test(d)) return "+91" + d.slice(1);
  if (/^91[6-9]\d{9}$/.test(d)) return "+" + d;
  if (/^\+\d{8,15}$/.test(d)) return d;
  return null;
}

/* ── routes ──────────────────────────────────────────── */
async function route(req, env) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, "");
  const clientId = env.GOOGLE_CLIENT_ID || "";

  if (path === "/api/config" && req.method === "GET") {
    return json({ googleClientId: clientId, enabled: !!(clientId && env.DB) });
  }
  if (!env.DB) return fail(503, "no_db");
  if (!clientId) return fail(503, "no_client_id");
  const db = env.DB;
  await ensureSchema(db);

  if (path === "/api/auth/google" && req.method === "POST") {
    const { credential } = await body(req);
    let c;
    try { c = await verifyGoogle(credential, clientId); }
    catch (e) { return fail(401, /^[a-z_]+$/.test(e.message) ? "google_" + e.message : "google_bad_token"); }
    const t = now();
    await db.prepare(
      `INSERT INTO users (id, email, gname, picture, created_at, last_seen) VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET email = excluded.email, gname = excluded.gname, picture = excluded.picture, last_seen = excluded.last_seen`,
    ).bind(c.sub, c.email || "", c.name || "", c.picture || "", t, t).run();
    const token = await newSession(db, c.sub);
    const u = await db.prepare("SELECT * FROM users WHERE id = ?").bind(c.sub).first();
    const st = await db.prepare("SELECT json FROM states WHERE user_id = ?").bind(c.sub).first();
    return json({ token, user: publicUser(u), state: st ? JSON.parse(st.json) : null });
  }

  const u = await currentUser(req, db);
  if (!u) return fail(401, "signed_out");

  if (path === "/api/me" && req.method === "GET") return json({ user: publicUser(u) });

  if (path === "/api/logout" && req.method === "POST") {
    await db.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(u.token_hash).run();
    return json({ ok: true });
  }

  if (path === "/api/profile" && req.method === "POST") {
    const b = await body(req);
    const sets = [], vals = [];
    if (b.phone !== undefined) {
      const ph = cleanPhone(b.phone);
      if (!ph) return fail(400, "bad_phone");
      if (!b.consent) return fail(400, "need_consent");
      sets.push("phone = ?", "consent_at = ?"); vals.push(ph, now());
    }
    if (b.board !== undefined) { sets.push("board = ?"); vals.push(b.board ? 1 : 0); }
    if (typeof b.name === "string" && b.name.trim()) { sets.push("name = ?"); vals.push(b.name.trim().slice(0, 60)); }
    if (sets.length) await db.prepare(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`).bind(...vals, u.id).run();
    const fresh = await db.prepare("SELECT * FROM users WHERE id = ?").bind(u.id).first();
    return json({ user: publicUser(fresh) });
  }

  if (path === "/api/sync" && req.method === "POST") {
    let incoming;
    try { ({ state: incoming } = await body(req)); } catch (e) { return fail(413, "too_large"); }
    if (!incoming || !Array.isArray(incoming.learned)) return fail(400, "bad_state");
    const row = await db.prepare("SELECT json FROM states WHERE user_id = ?").bind(u.id).first();
    const stored = row ? JSON.parse(row.json) : null;
    const merged = mergeState(incoming, stored);
    merged.log = mergeLog(incoming.log, stored?.log);
    const t = now();
    const stmts = [
      db.prepare(`INSERT INTO states (user_id, json, updated_at) VALUES (?, ?, ?)
                  ON CONFLICT(user_id) DO UPDATE SET json = excluded.json, updated_at = excluded.updated_at`)
        .bind(u.id, JSON.stringify(merged), t),
      db.prepare("UPDATE users SET last_seen = ?, name = COALESCE(NULLIF(name, ''), ?) WHERE id = ?")
        .bind(t, (merged.name || "").slice(0, 60), u.id),
    ];
    for (const [day, v] of Object.entries(merged.log || {})) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) continue;
      stmts.push(db.prepare(
        `INSERT INTO activity (user_id, day, n, p) VALUES (?, ?, ?, ?)
         ON CONFLICT(user_id, day) DO UPDATE SET n = MAX(n, excluded.n), p = MAX(p, excluded.p)`,
      ).bind(u.id, day, Math.max(0, Math.min(500, v.n | 0)), v.p ? 1 : 0));
    }
    await db.batch(stmts);
    return json({ state: merged, at: t });
  }

  return fail(404, "not_found");
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(req);
    try { return await route(req, env); }
    catch (e) { console.error(e); return fail(500, "server_error"); }
  },
};
