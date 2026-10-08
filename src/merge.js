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
  const srs = { ...(a.srs || {}) };
  for (const [k, v] of Object.entries(b.srs || {})) {
    const cur = srs[k];
    if (!cur || v.lvl > cur.lvl || (v.lvl === cur.lvl && v.due > cur.due)) srs[k] = v;
  }
  const later = (a.lastDay || "") >= (b.lastDay || "") ? a : b;
  const ticks = { ...(b.challengeTicks || {}) };
  for (const [wk, t] of Object.entries(a.challengeTicks || {})) {
    const o = ticks[wk] || [];
    ticks[wk] = [0, 1, 2].map((i) => !!(t?.[i] || o[i]));
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
    mistakes: union(a.mistakes, b.mistakes),
    reports: [...(a.reports || []), ...(b.reports || []).filter((r) => !(a.reports || []).some((x) => x.kind === r.kind && x.id === r.id))],
    srs,
    xp: Math.max(a.xp || 0, b.xp || 0),
    streak: later.streak || 0, lastDay: later.lastDay || null,
    challengeTicks: ticks,
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
