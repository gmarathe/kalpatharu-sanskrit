// Cloud save: Google sign-in + background sync with the Worker (/api/*).
// The app keeps working offline; sync just catches up when it can.

const AUTH_KEY = "ksm-auth";

export function getAuth() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); } catch { return null; }
}
export function setAuth(a) {
  try { a ? localStorage.setItem(AUTH_KEY, JSON.stringify(a)) : localStorage.removeItem(AUTH_KEY); } catch {}
}

async function call(path, { method = "GET", data, token } = {}) {
  const r = await fetch(path, {
    method,
    headers: { "content-type": "application/json", ...(token ? { authorization: "Bearer " + token } : {}) },
    body: data ? JSON.stringify(data) : undefined,
    keepalive: method !== "GET" && (!data || JSON.stringify(data).length < 60000),
  });
  let out = {};
  try { out = await r.json(); } catch {}
  if (!r.ok) { const e = new Error(out.error || "http_" + r.status); e.status = r.status; throw e; }
  return out;
}

let cfgP = null;
export function getConfig() {
  if (!cfgP) cfgP = call("/api/config").catch(() => ({ enabled: false }));
  return cfgP;
}

export const signInGoogle = (credential) => call("/api/auth/google", { method: "POST", data: { credential } });
export const fetchMe = (token) => call("/api/me", { token });
export const saveProfile = (token, data) => call("/api/profile", { method: "POST", data, token });
export const logout = (token) => call("/api/logout", { method: "POST", token }).catch(() => {});
export const fetchAdmin = (token, week) => call("/api/admin/summary" + (week ? "?week=" + week : ""), { token });
export const fetchBoard = (token, week) => call("/api/board?week=" + week, { token });
export const pushState = (token, state) => call("/api/sync", { method: "POST", data: { state }, token });

// Google Identity Services script, loaded only when the sign-in card is shown
let gsiP = null;
export function loadGsi() {
  if (window.google?.accounts?.id) return Promise.resolve(window.google);
  if (!gsiP) gsiP = new Promise((res, rej) => {
    const sc = document.createElement("script");
    sc.src = "https://accounts.google.com/gsi/client"; sc.async = true;
    sc.onload = () => res(window.google); sc.onerror = () => { gsiP = null; rej(new Error("gsi")); };
    document.head.appendChild(sc);
  });
  return gsiP;
}

/* ── daily reminder (Web Push) — opt-in only ── */
const PUSH_KEY = "ksm-push";
export const getPush = () => { try { return JSON.parse(localStorage.getItem(PUSH_KEY) || "null"); } catch { return null; } };
const setPush = (v) => { try { v ? localStorage.setItem(PUSH_KEY, JSON.stringify(v)) : localStorage.removeItem(PUSH_KEY); } catch {} };
export const pushSupported = () => typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
const keyBytes = (b) => Uint8Array.from(atob(b.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (b.length % 4)) % 4)), (c) => c.charCodeAt(0));
export async function pushOn(pushKey, time) {
  if ((await Notification.requestPermission()) !== "granted") throw new Error("denied");
  const reg = await navigator.serviceWorker.ready;
  const sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(pushKey) }));
  await call("/api/push/subscribe", { method: "POST", data: { endpoint: sub.endpoint, time } });
  setPush({ endpoint: sub.endpoint, time });
}
export async function pushOff() {
  const p = getPush();
  try { const reg = await navigator.serviceWorker.ready; const sub = await reg.pushManager.getSubscription(); if (sub) await sub.unsubscribe(); } catch {}
  if (p) await call("/api/push/unsubscribe", { method: "POST", data: { endpoint: p.endpoint } }).catch(() => {});
  setPush(null);
}
// tell the server once a day that today's learning is done, so no reminder comes
export function pushDone(day) {
  const p = getPush();
  if (!p || p.done === day) return;
  setPush({ ...p, done: day });
  call("/api/push/done", { method: "POST", data: { endpoint: p.endpoint } }).catch(() => setPush({ ...p, done: null }));
}
