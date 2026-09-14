/* ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್ — core logic (no UI) */
import { WORDS, SENTENCES, DIALOGUES, CHALLENGES, GRAMMAR, SUBHASHITAS, READINGS } from "./content.js";

/* ── config ─────────────────────────────────────────────── */
// ಈಗ ಆ್ಯಪ್ Netlify ನಲ್ಲಿ ಇದೆ. ksm.kalpatharu.org ಸಿದ್ಧವಾದಾಗ ಇಲ್ಲಿ ಬದಲಿಸಿ.
export const APP_URL = "https://resonant-lolly-984bd2.netlify.app";
export const WA_GROUP = "https://chat.whatsapp.com/Es2A3rScgTO1EHrQVgq2LP";
export const SHOW_UNVERIFIED = true; // false ಮಾಡಿದರೆ VERIFIED ವಿಷಯ ಮಾತ್ರ ಕಾಣುತ್ತದೆ
const KEY = "kalpatharu-sanskrit-v1"; // ಬದಲಿಸಬೇಡಿ — ಹಳೆಯ ಪ್ರಗತಿ ಇದಕ್ಕೇ ಕಟ್ಟಿದೆ
export const SCHEMA = 2;

/* ── local calendar day (device timezone, midnight rollover) ── */
const localMs = () => Date.now() - new Date().getTimezoneOffset() * 60000;
export const dayNum = () => Math.floor(localMs() / 864e5);
export const dayKey = (n = dayNum()) => new Date(n * 864e5).toISOString().slice(0, 10);
export const weekNum = () => Math.floor((dayNum() + 3) / 7); // weeks start on Monday
export const pad3 = (n) => String(n).padStart(3, "0");

/* ── state ──────────────────────────────────────────────── */
export const EMPTY = {
  schema: SCHEMA,
  name: "", onboarded: false,
  showDeva: true, fontStep: 1, contrast: false,
  learned: [], sentences: [], dialogues: [],
  grammar: [], subhashitas: [], readings: [],   // ಹಂತ 4, 5, 6 — ಮುಗಿಸಿದ id ಗಳು
  srs: {},          // "w12" | "s5" → { lvl, due }
  mistakes: [],     // "w12" | "s5"
  xp: 0, streak: 0, lastDay: null,
  badges: [], shares: 0,
  challengeTicks: {}, // weekNum → [bool,bool,bool]
  reports: [],        // { kind:"w"|"s"|"d", id, label, on }
  l0done: false,
};

// V1 → V2: numeric SRS keys become "w<id>", report labels become ids.
export function migrate(raw) {
  const s = { ...EMPTY, ...raw };
  if ((raw.schema || 1) < 2) {
    const srs = {};
    for (const [k, v] of Object.entries(raw.srs || {})) srs[/^\d+$/.test(k) ? "w" + k : k] = v;
    s.srs = srs;
    s.mistakes = (raw.mistakes || []).map((m) => (typeof m === "number" || /^\d+$/.test(m) ? "w" + m : m));
    s.reports = (raw.reports || []).map((r) => {
      if (r.kind) return r;
      const lab = r.label || "";
      const body = lab.replace(/^[^:]+:\s*/, "");
      let kind = null, id = null;
      if (lab.startsWith("ಪದ")) { kind = "w"; id = WORDS.find((w) => w.d === body)?.id; }
      else if (lab.startsWith("ವಾಕ್ಯ")) { kind = "s"; id = SENTENCES.find((x) => x.d === body)?.id; }
      else if (lab.startsWith("ಸಂವಾದ")) { kind = "d"; id = DIALOGUES.find((x) => x.t === body)?.id; }
      return { kind, id: id ?? null, label: lab, on: r.on };
    });
    s.schema = SCHEMA;
  }
  return s;
}

export async function load() {
  try {
    const v = window.localStorage.getItem(KEY);
    if (v) return migrate(JSON.parse(v));
  } catch {}
  return { ...EMPTY };
}
export function save(s) {
  try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

/* ── visibility: withdrawn / unverified / reported-by-me ── */
const okStatus = (x) => x.status !== "WITHDRAWN" && (SHOW_UNVERIFIED || x.status === "VERIFIED");
const isReported = (s, kind, id) => s.reports.some((r) => r.kind === kind && r.id === id);
export const visWords = (s) => WORDS.filter((w) => okStatus(w) && !isReported(s, "w", w.id));
export const visSents = (s) => SENTENCES.filter((x) => okStatus(x) && !isReported(s, "s", x.id));
export const visDias = (s) => DIALOGUES.filter((x) => okStatus(x) && !isReported(s, "d", x.id));
export const visGram = (s) => GRAMMAR.filter((x) => okStatus(x) && !isReported(s, "g", x.id));
export const visSubh = (s) => SUBHASHITAS.filter((x) => okStatus(x) && !isReported(s, "u", x.id));
export const visRead = (s) => READINGS.filter((x) => okStatus(x) && !isReported(s, "r", x.id));

/* ── spaced repetition ──────────────────────────────────── */
export const INTERVALS = [0, 1, 3, 7, 21];
export function gradeItem(s, key, right) {
  const cur = s.srs[key] || { lvl: 0, due: 0 };
  const lvl = right ? Math.min(4, cur.lvl + 1) : Math.max(0, cur.lvl - 1);
  const mistakes = right ? s.mistakes.filter((m) => m !== key)
    : s.mistakes.includes(key) ? s.mistakes : [...s.mistakes, key];
  return { ...s, mistakes, xp: s.xp + (right ? 2 : 0), srs: { ...s.srs, [key]: { lvl, due: dayNum() + INTERVALS[lvl] } } };
}
export function wordState(s, id) {
  if (!s.learned.includes(id)) return 0;               // ಹೊಸದು
  const r = s.srs["w" + id];
  if (r && r.lvl >= 4) return 3;                       // ಕರಗತ
  if (s.mistakes.includes("w" + id)) return 2;         // ಪುನರಾವರ್ತನೆ ಬೇಕು
  return 1;                                            // ಕಲಿಯುತ್ತಿದೆ
}
export const isDue = (s, key) => (s.srs[key]?.due ?? 0) <= dayNum();

/* streak: any learning activity counts for the local day */
export function touch(s) {
  const today = dayKey();
  if (s.lastDay === today) return s;
  const yest = dayKey(dayNum() - 1);
  return { ...s, lastDay: today, streak: s.lastDay === yest ? s.streak + 1 : 1 };
}

/* ── helpers ───────────────────────────────────────────── */
export const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const pick = (a, n) => shuffle(a).slice(0, n);
export const uniq = (a) => [...new Set(a)];

// strip final म्/ं/ः so गृहम् matches गृहं
const stem = (t) => t.replace(/[।?,!]/g, "").replace(/(म्|ं|ः|्)$/u, "");
export function usageOf(word, sents) {
  const st = stem(word.d);
  return sents.find((x) => x.d.split(/\s+/).some((tok) => stem(tok) === st)) || null;
}
export const tokens = (sent) => sent.d.replace(/।/g, "").trim().split(/\s+/);

export const challengeOfWeek = () => CHALLENGES[weekNum() % CHALLENGES.length];

/* ── share texts (plain text, WhatsApp friendly) ────────── */
const HEAD = "🌿 ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್";
const FOOT = "ಸಂಸ್ಕೃತಂ ಸಹ ಪಠಾಮಃ 🙏";
const sig = (s, tag) => `— ${s.name} | ${tag} | 🔥 ${s.streak} ದಿನ`;
export const shareWord = (w, s) => `${HEAD}\nಇಂದು ನಾನು ಕಲಿತದ್ದು:\n\n${w.d}\n${w.k}\n${w.m}\n\n${sig(s, "ಪದ #" + pad3(w.id))}\n${FOOT}`;
export const shareSentence = (x, s) => `${HEAD}\nಇಂದಿನ ವಾಕ್ಯ:\n\n${x.d}\n${x.k}\n${x.m}\n\n${sig(s, "ವಾಕ್ಯ #" + pad3(x.id))}\n${FOOT}`;
export const shareLesson = (ws, s) => `${HEAD}\nಇಂದು ನಾನು ${ws.length} ಹೊಸ ಪದಗಳನ್ನು ಕಲಿತೆ:\n\n${ws.map((w) => `${w.d} — ${w.k} — ${w.m}`).join("\n")}\n\n— ${s.name} | 🔥 ${s.streak} ದಿನ\n${FOOT}`;
export const shareBadge = (b, s) => `${HEAD}\nಹೊಸ ಸಾಧನೆ: ${b.t} 🏅\n(${b.d})\n\n— ${s.name} | 🔥 ${s.streak} ದಿನ\n${FOOT}`;
export const shareChallenge = (c, s) => `${HEAD}\nಈ ವಾರದ ಸವಾಲು ಪೂರ್ಣಗೊಳಿಸಿದೆ ✅\n\n${c}\n\n— ${s.name} | 🔥 ${s.streak} ದಿನ\n${FOOT}`;
export const shareFree = (prompt, s) => `${HEAD}\n${prompt}\n\n(ಇಲ್ಲಿ ಕನ್ನಡದಲ್ಲಿ ಬರೆಯಿರಿ)\n\n— ${s.name}\n${FOOT}`;
export const shareSubhashita = (v, s) => `${HEAD}\nಇಂದಿನ ಸುಭಾಷಿತ:\n\n${v.lines.map((l) => l[0]).join("\n")}\n\n${v.lines.map((l) => l[1]).join("\n")}\n\n${v.m}\n(${v.from})\n\n${sig(s, "ಸುಭಾಷಿತ #" + pad3(v.id))}\n${FOOT}`;
export const inviteText = (s) => `${HEAD}\nನಾನು ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲದಲ್ಲಿ ಸಂಸ್ಕೃತ ಕಲಿಯಲು ಶುರು ಮಾಡಿದ್ದೇನೆ.\nದಿನಕ್ಕೆ ಐದು ನಿಮಿಷ ಸಾಕು. ನೀವೂ ಜೊತೆಗೆ ಕಲಿಯುತ್ತೀರಾ?\n\nಆ್ಯಪ್: ${APP_URL}\nಮಂಡಲಕ್ಕೆ ಸೇರಲು: ${WA_GROUP}\n\n— ${s.name}\n${FOOT}`;

/* ── progress backup / transfer ─────────────────────────── */
const SAVE_FIELDS = ["name", "onboarded", "showDeva", "fontStep", "contrast", "learned", "sentences", "dialogues", "grammar", "subhashitas", "readings", "srs", "mistakes", "xp", "streak", "lastDay", "badges", "shares", "challengeTicks", "reports", "l0done", "schema"];
const b64u = (str) => btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));
export function exportCode(s) {
  const o = {}; for (const f of SAVE_FIELDS) o[f] = s[f];
  return b64u(JSON.stringify(o));
}
export function importCode(code) {
  const raw = JSON.parse(unb64u(code.trim().replace(/^.*#import=/, "")));
  if (!raw || !Array.isArray(raw.learned)) throw new Error("bad");
  return migrate(raw);
}
export const transferLink = (s) => `${APP_URL}/#import=${exportCode(s)}`;
