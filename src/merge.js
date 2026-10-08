// Merge two copies of a learner's progress (two phones, phone + server, or an
// import link). Pure: no browser APIs, so the Worker uses the same code.
// `a` wins for settings (name, font, contrast); learning is combined, never lost.

const union = (x = [], y = []) => [...new Set([...x, ...y])];

export function mergeLog(a = {}, b = {}) {
  const out = { ...a };
  for (const [day, v] of Object.entries(b)) {
    const u = out[day] || { n: 0, p: 0 };
    out[day] = { n: Math.max(u.n || 0, v.n || 0), p: (u.p || v.p) ? 1 : 0 };
  }
  // keep about three weeks; older days are already stored on the server
  const keep = Object.keys(out).sort().slice(-21);
  return Object.fromEntries(keep.map((d) => [d, out[d]]));
}

export function mergeState(a, b) {
  if (!b) return a;
  if (!a) return b;
  // SRS: the newer answer wins (so a wrong answer after a right one sticks); old entries without `at` fall back to the higher level
  const srs = { ...(a.srs || {}) };
  const srsFrom = {};
  for (const k of Object.keys(srs)) srsFrom[k] = "a";
  for (const [k, v] of Object.entries(b.srs || {})) {
    const cur = srs[k];
    const bWins = !cur ? true
      : (v.at || cur.at) ? (v.at || 0) > (cur.at || 0)
      : v.lvl > cur.lvl || (v.lvl === cur.lvl && v.due > cur.due);
    if (bWins) { srs[k] = v; srsFrom[k] = "b"; }
  }
  // mistakes follow the side whose SRS entry won — a mistake fixed on one phone stays fixed
  const mistakes = union(a.mistakes, b.mistakes).filter((k) => {
    const side = srsFrom[k];
    if (!side) return true;
    return (side === "a" ? a.mistakes : b.mistakes || []).includes(k);
  });
  // reports: per item, the newer of report / undo (`off`) wins
  const stamp = (r) => r.off || r.at || 0;
  const reps = new Map();
  for (const r of [...(b.reports || []), ...(a.reports || [])]) {
    const key = r.kind + ":" + r.id;
    const cur = reps.get(key);
    if (!cur || stamp(r) >= stamp(cur)) reps.set(key, r);
  }
  const later = (a.lastDay || "") >= (b.lastDay || "") ? a : b;
  // weekly challenge: the side that changed that week's ticks last wins (so un-ticking survives); no time → combine
  const ticks = { ...(b.challengeTicks || {}) };
  const ticksAt = { ...(b.challengeAt || {}) };
  for (const [wk, t] of Object.entries(a.challengeTicks || {})) {
    const ta = a.challengeAt?.[wk] || 0, tb = b.challengeAt?.[wk] || 0;
    if (!(wk in ticks) || ta >= tb && ta) { ticks[wk] = t; ticksAt[wk] = ta; }
    else if (!ta && !tb) { const o = ticks[wk] || []; ticks[wk] = [0, 1, 2].map((i) => !!(t?.[i] || o[i])); }
  }
  const pa = a.plan, pb = b.plan;
  const plan = pa && pb && pa.day === pb.day
    ? { day: pa.day, w: pa.w || pb.w, s: pa.s || pb.s, r: pa.r || pb.r, u: pa.u || pb.u }
    : (pa?.day || "") >= (pb?.day || "") ? pa : pb;
  return {
    ...b, ...a,
    name: a.name || b.name,
    onboarded: !!(a.onboarded || b.onboarded),
    learned: union(a.learned, b.learned),
    sentences: union(a.sentences, b.sentences),
    dialogues: union(a.dialogues, b.dialogues),
    grammar: union(a.grammar, b.grammar),
    subhashitas: union(a.subhashitas, b.subhashitas),
    readings: union(a.readings, b.readings),
    badges: union(a.badges, b.badges),
    mistakes,
    reports: [...reps.values()],
    srs,
    xp: Math.max(a.xp || 0, b.xp || 0),
    streak: later.streak || 0, lastDay: later.lastDay || null,
    challengeTicks: ticks,
    challengeAt: ticksAt,
    shares: Math.max(a.shares || 0, b.shares || 0),
    l0done: !!(a.l0done || b.l0done),
    plan,
    log: mergeLog(a.log, b.log),
  };
}

// total finished items — used to count "new items learned today"
export const itemCount = (s) =>
  (s.learned?.length || 0) + (s.sentences?.length || 0) + (s.dialogues?.length || 0) +
  (s.grammar?.length || 0) + (s.subhashitas?.length || 0) + (s.readings?.length || 0);

/* ── ಸಾಧನಾ ಅಂಕ — weekly score, max 200 (same rule in the app and on the server) ──
   each day learned 10 · today's plan complete 5 · new items 1 each (max 10 a day)
   · weekly challenge 5 per step + 10 when all three are done */
export const WEEK_MAX = 200;
export const weekDayKeys = (wk) => Array.from({ length: 7 }, (_, i) => new Date((wk * 7 - 3 + i) * 864e5).toISOString().slice(0, 10));
export function weekScore(days, ticks) {
  let pts = 0;
  for (const a of days) pts += 10 + (a.p ? 5 : 0) + Math.min(10, a.n | 0);
  const t = (ticks || []).filter(Boolean).length;
  pts += 5 * t + (t === 3 ? 10 : 0);
  return { pts, days: days.length };
}
