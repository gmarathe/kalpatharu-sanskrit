import React, { useState, useEffect, useMemo, useRef } from "react";
import { VOWELS, CONSONANTS, NOTES, MODULES, WORDS, SENTENCES, DIALOGUES, GRAMMAR, SUBHASHITAS, READINGS } from "./content.js";
import {
  EMPTY, load, save, migrate, dayNum, weekNum, pad3, pick, shuffle,
  visWords, visSents, visDias, visGram, visSubh, visRead, gradeItem, wordState, isDue, touch, usageOf,
  challengeOfWeek, shareWord, shareSentence, shareLesson, shareBadge, shareChallenge, shareFree, shareSubhashita,
  inviteText, exportCode, importCode, transferLink, WA_GROUP, APP_URL,
  planToday, markPlan, seedSrs, reminderIcs, reminderWa, dayKey, activeReports,
} from "./lib.js";
import { mergeState, itemCount, weekScore, weekDayKeys, WEEK_MAX } from "./merge.js";
import { getAuth, setAuth, getConfig, signInGoogle, fetchMe, saveProfile, logout, pushState, loadGsi, fetchBoard } from "./sync.js";
import {
  Btn, Header, Bar, ScriptCard, Parts, SrcLine, Quiz, FS,
  wordQ, matchQ, sentQ, distinct, nextLineQ, letterQ, alignable, grammarQuiz, gramReviewQ, subhFillQ, gistQ, readQ,
} from "./ui.jsx";

const VERSION = "2.8";

/* ── badges ─────────────────────────────────────────────── */
// g: earned?  p: [done, needed] progress  go: where to go to earn it  h: hint shown on the locked card
const challengeBest = (s) => Math.max(0, ...Object.values(s.challengeTicks).map((t) => (t || []).filter(Boolean).length));
const BADGES = [
  { id: "b1", t: "ಪ್ರಥಮಪದಮ್", d: "ಮೊದಲ ಸಂಸ್ಕೃತ ಪದ", g: (s) => s.learned.length >= 1, p: (s) => [s.learned.length, 1], go: { kind: "lesson" }, h: "ಪದಗಳ ಪಾಠ" },
  { id: "b2", t: "ದಶಪದಾನಿ", d: "10 ಪದಗಳು", g: (s) => s.learned.length >= 10, p: (s) => [s.learned.length, 10], go: { kind: "lesson" }, h: "ಪದಗಳ ಪಾಠ" },
  { id: "b3", t: "ಪಞ್ಚಾಶತ್", d: "50 ಪದಗಳು", g: (s) => s.learned.length >= 50, p: (s) => [s.learned.length, 50], go: { kind: "lesson" }, h: "ಪದಗಳ ಪಾಠ" },
  { id: "b4", t: "ಶತಪದಾನಿ", d: "100 ಪದಗಳು", g: (s) => s.learned.length >= 100, p: (s) => [s.learned.length, 100], go: { kind: "lesson" }, h: "ಪದಗಳ ಪಾಠ" },
  { id: "b5", t: "ಪ್ರಥಮವಾಕ್ಯಮ್", d: "ಮೊದಲ ವಾಕ್ಯ", g: (s) => s.sentences.length >= 1, p: (s) => [s.sentences.length, 1], go: { kind: "l2" }, h: "ವಾಕ್ಯ ಕಲಿಯಿರಿ" },
  { id: "b6", t: "ಪ್ರಥಮಸಂವಾದಃ", d: "ಮೊದಲ ಸಂಭಾಷಣೆ", g: (s) => s.dialogues.length >= 1, p: (s) => [s.dialogues.length, 1], go: { kind: "l3" }, h: "ಸಂವಾದಕ್ಕೆ" },
  { id: "b7", t: "ಸಪ್ತದಿನಸಾಧನಾ", d: "7 ದಿನಗಳ ಸರಣಿ", g: (s) => s.streak >= 7, p: (s) => [s.streak, 7], go: { tab: "home" }, h: "ಪ್ರತಿದಿನ ಒಂದು ಪಾಠ" },
  { id: "b8", t: "ತ್ರಿಂಶದ್ದಿನಸಾಧನಾ", d: "30 ದಿನಗಳ ಸರಣಿ", g: (s) => s.streak >= 30, p: (s) => [s.streak, 30], go: { tab: "home" }, h: "ಪ್ರತಿದಿನ ಒಂದು ಪಾಠ" },
  { id: "b9", t: "ಪ್ರಥಮಸವಾಲು", d: "ಮೊದಲ ಸಪ್ತಾಹದ ಸವಾಲು", g: (s) => Object.values(s.challengeTicks).some((t) => t && t.every(Boolean)), p: (s) => [challengeBest(s), 3], go: { tab: "home" }, h: "ಸವಾಲಿನ ಮೂರು ಗುರುತು" },
  { id: "b10", t: "ವ್ಯಾಕರಣಪ್ರವೇಶಃ", d: "ಮೊದಲ ವ್ಯಾಕರಣ ಪಾಠ", g: (s) => s.grammar.length >= 1, p: (s) => [s.grammar.length, 1], go: { kind: "l4" }, h: "ವ್ಯಾಕರಣ ಪಾಠ + ಅಭ್ಯಾಸ" },
  { id: "b11", t: "ಸುಭಾಷಿತಪ್ರಿಯಃ", d: "ಮೊದಲ ಸುಭಾಷಿತ", g: (s) => s.subhashitas.length >= 1, p: (s) => [s.subhashitas.length, 1], go: { kind: "l5" }, h: "ಸುಭಾಷಿತ ಕಂಠಪಾಠ" },
  { id: "b12", t: "ವಾಚಕಃ", d: "ಮೊದಲ ವಾಚನ", g: (s) => s.readings.length >= 1, p: (s) => [s.readings.length, 1], go: { kind: "l6" }, h: "ವಾಚನ + ಗ್ರಹಿಕೆಯ ಪ್ರಶ್ನೆ" },
  { id: "b13", t: "ದಶಸುಭಾಷಿತಾನಿ", d: "10 ಸುಭಾಷಿತಗಳು", g: (s) => s.subhashitas.length >= 10, p: (s) => [s.subhashitas.length, 10], go: { kind: "l5" }, h: "ಸುಭಾಷಿತ ಕಂಠಪಾಠ" },
  { id: "b14", t: "ದ್ವಿಶತಪದಾನಿ", d: "200 ಪದಗಳು", g: (s) => s.learned.length >= 200, p: (s) => [s.learned.length, 200], go: { kind: "lesson" }, h: "ಪದಗಳ ಪಾಠ" },
  { id: "b15", t: "ಸಂಸ್ಕೃತಸಾಧಕಃ", d: "ಎಲ್ಲಾ ಆರು ಹಂತ ಪೂರ್ಣ", g: (s) => stagesDone(s) >= 6, p: (s) => [stagesDone(s), 6], go: { tab: "learn" }, h: "ಪ್ರತಿ ಹಂತದ ಎಲ್ಲಾ ಪಾಠ" },
];
// how many of the six learning stages are fully complete (visible content only)
function stagesDone(s) {
  const full = (done, all) => all.length > 0 && all.every((x) => done.includes(x.id));
  return [full(s.learned, visWords(s)), full(s.sentences, visSents(s)), full(s.dialogues, visDias(s)),
    full(s.grammar, visGram(s)), full(s.subhashitas, visSubh(s)), full(s.readings, visRead(s))].filter(Boolean).length;
}

/* ═══════════════════ root ═══════════════════ */
export default function App() {
  const [s, setS] = useState(null);
  const [tab, setTab] = useState("home");
  const [view, setView] = useState(null);     // full-screen sub view
  const [sheet, setSheet] = useState(null);   // { kind:"share"|"report"|"import", ... }
  const [toast, setToast] = useState(null);
  const toastT = useRef();
  const sRef = useRef(null);
  // cloud save: cfg from /api/config, auth token in localStorage, user profile from server
  const [cloud, setCloud] = useState({ cfg: null, auth: getAuth(), user: null, status: "idle", at: null });
  const syncT = useRef({ timer: null, busy: false, again: false });

  useEffect(() => {
    const checkHash = () => {
      const m = location.hash.match(/#import=(.+)$/);
      if (!m) return;
      try { setSheet({ kind: "import", data: importCode(m[1]) }); } catch { flash("ಈ ವರ್ಗಾವಣೆ ಲಿಂಕ್ ಸರಿಯಿಲ್ಲ."); }
      history.replaceState(null, "", location.pathname);
    };
    load().then((st) => { sRef.current = st; setS(st); checkHash(); });
    getConfig().then((cfg) => {
      setCloud((c) => ({ ...c, cfg }));
      const a = getAuth();
      if (cfg.enabled && a) {
        fetchMe(a.token).then((r) => setCloud((c) => ({ ...c, user: r.user })), (e) => { if (e.status === 401) signedOut(); });
        setTimeout(syncNow, 1500);
      }
    });
    const onHide = () => { if (document.visibilityState === "hidden" && syncT.current.timer) { clearTimeout(syncT.current.timer); syncT.current.timer = null; syncNow(); } };
    document.addEventListener("visibilitychange", onHide);
    addEventListener("hashchange", checkHash);
    return () => { removeEventListener("hashchange", checkHash); document.removeEventListener("visibilitychange", onHide); };
  }, []);
  useEffect(() => { if (s) document.documentElement.classList.toggle("hc", !!s.contrast); }, [s?.contrast]);

  function flash(msg, action) {
    clearTimeout(toastT.current);
    setToast({ msg, action });
    toastT.current = setTimeout(() => setToast(null), action ? 6000 : 2600);
  }

  function signedOut() { setAuth(null); setCloud((c) => ({ ...c, auth: null, user: null, status: "idle" })); }

  async function syncNow() {
    const a = getAuth();
    if (!a || !sRef.current) return;
    const t = syncT.current;
    if (t.busy) { t.again = true; return; }
    t.busy = true; t.again = false;
    setCloud((c) => ({ ...c, status: "saving" }));
    try {
      const r = await pushState(a.token, sRef.current);
      update((st) => mergeState(st, r.state), { nolog: true, nosync: true });
      setCloud((c) => ({ ...c, status: "ok", at: r.at }));
    } catch (e) {
      if (e.status === 401) signedOut();
      else setCloud((c) => ({ ...c, status: "error" }));
    } finally {
      t.busy = false;
      if (t.again) scheduleSync();
    }
  }
  function scheduleSync() {
    if (!getAuth()) return;
    clearTimeout(syncT.current.timer);
    syncT.current.timer = setTimeout(() => { syncT.current.timer = null; syncNow(); }, 4000);
  }

  // every state change: apply, award badges, log today's activity, persist, sync
  const update = (fn, opt = {}) => setS((prev) => {
    let n = typeof fn === "function" ? fn(prev) : { ...prev, ...fn };
    if (n === prev) return prev;
    const fresh = BADGES.filter((b) => b.g(n) && !n.badges.includes(b.id));
    if (fresh.length) {
      n = { ...n, badges: [...n.badges, ...fresh.map((b) => b.id)] };
      const b = fresh[fresh.length - 1];
      setTimeout(() => flash(`🏅 ಹೊಸ ಸಾಧನೆ: ${b.t}`, { label: "ಹಂಚಿಕೊಳ್ಳಿ", run: () => setSheet({ kind: "share", text: shareBadge(b, n) }) }), 50);
    }
    if (!opt.nolog) n = logToday(prev, n);
    save(n);
    sRef.current = n;
    if (!opt.nosync) scheduleSync();
    return n;
  });

  if (!s) return <div className="ks"><div className="loading">ಸಿದ್ಧವಾಗುತ್ತಿದೆ…</div></div>;

  const cloudApi = {
    login: async (credential) => {
      try {
        const r = await signInGoogle(credential);
        setAuth({ token: r.token });
        setCloud((c) => ({ ...c, auth: { token: r.token }, user: r.user }));
        const other = sRef.current?.owner && sRef.current.owner !== r.user.id;
        if (other) {
          // this phone's progress belongs to another Google account — don't mix two people's learning
          update((st) => ({
            ...(r.state ? migrate(r.state) : { ...EMPTY, name: r.user.name || "", onboarded: true }),
            showDeva: st.showDeva, fontStep: st.fontStep, contrast: st.contrast, owner: r.user.id,
          }), { nolog: true, nosync: true });
          flash("ಲಾಗಿನ್ ಆಯಿತು. ಈ ಖಾತೆಯ ಪ್ರಗತಿ ತೆರೆಯಲಾಗಿದೆ ☁️");
        } else {
          update((st) => ({ ...(r.state ? mergeState(st, r.state) : st), owner: r.user.id }), { nolog: true, nosync: true });
          flash(r.state ? "ಲಾಗಿನ್ ಆಯಿತು. ನಿಮ್ಮ ಪ್ರಗತಿ ಮರಳಿ ಬಂದಿದೆ ☁️" : "ಲಾಗಿನ್ ಆಯಿತು. ಪ್ರಗತಿ ಉಳಿಸಲಾಗುತ್ತಿದೆ ☁️");
        }
        setTimeout(syncNow, 300);
      } catch { flash("ಲಾಗಿನ್ ಆಗಲಿಲ್ಲ. ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ."); }
    },
    profile: async (data) => {
      const a = getAuth(); if (!a) return false;
      try { const r = await saveProfile(a.token, data); setCloud((c) => ({ ...c, user: r.user })); return true; }
      catch (e) {
        if (e.status === 401) signedOut();
        flash(e.message === "bad_phone" ? "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಸರಿಯಿಲ್ಲ. 10 ಅಂಕಿಯ ಸಂಖ್ಯೆ ಹಾಕಿ." : "ಉಳಿಸಲು ಆಗಲಿಲ್ಲ. ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.");
        return false;
      }
    },
    logout: async () => { const a = getAuth(); if (a) await logout(a.token); signedOut(); flash("ಲಾಗ್ ಔಟ್ ಆಯಿತು. ಈ ಫೋನಿನ ಪ್ರಗತಿ ಹಾಗೆಯೇ ಇದೆ."); },
    syncNow,
  };

  const api = {
    s, update, flash, cloud, cloudApi,
    go: setView, close: () => setView(null),
    share: (text) => setSheet({ kind: "share", text }),
    report: (kind, id, label) => setSheet({ kind: "report", r: { kind, id, label } }),
    grade: (grades) => update((st) => touch(grades.reduce((acc, [k, ok]) => gradeItem(acc, k, ok), st))),
    openImport: (data) => setSheet({ kind: "import", data }),
    learnWord: (id) => update((st) => touch(st.learned.includes(id) ? st : { ...st, learned: [...st.learned, id], xp: st.xp + 5 })),
    // tick one item of today's plan; celebrate when all four are done
    plan: (k) => update((st) => {
      if (planToday(st)[k]) return st;
      const n = markPlan(st, k), p = n.plan;
      if (p.w && p.s && p.u && (p.r || !dueItems(n).length)) setTimeout(() => flash("ಇಂದಿನ ಗುರಿ ಪೂರ್ಣ 🌿 ನಾಳೆ ಮತ್ತೆ ಸಿಗೋಣ."), 50);
      return n;
    }),
  };

  if (!s.onboarded) return (
    <div className="ks">
      <Onboarding onDone={(name) => update({ name, onboarded: true })} />
      {sheet?.kind === "import" && <ImportSheet api={api} data={sheet.data} close={() => setSheet(null)} />}
    </div>
  );

  const V = view && VIEWS[view.kind];
  return (
    <div className="ks">
      <main className="page">
        {V ? <V api={api} {...view} />
          : tab === "home" ? <Home api={api} setTab={setTab} />
          : tab === "learn" ? <Learn api={api} />
          : tab === "practice" ? <Practice api={api} />
          : tab === "circle" ? <Circle api={api} setTab={setTab} />
          : <Me api={api} setTab={setTab} />}
      </main>
      {!V && <Nav tab={tab} setTab={setTab} />}
      {sheet?.kind === "share" && <ShareSheet text={sheet.text} close={() => setSheet(null)}
        onShared={() => update((st) => ({ ...st, shares: st.shares + 1 }))} flash={flash} />}
      {sheet?.kind === "report" && <ReportSheet r={sheet.r} close={() => setSheet(null)} api={api} />}
      {sheet?.kind === "import" && <ImportSheet api={api} data={sheet.data} close={() => setSheet(null)} />}
      {toast && (
        <div className="toast" role="status">
          <span>{toast.msg}</span>
          {toast.action && <button type="button" className="link light" onClick={() => { setToast(null); toast.action.run(); }}>{toast.action.label}</button>}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ onboarding ═══════════════════ */
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  return (
    <div className="onb">
      {step === 0 && (<>
        <div className="onb-mark" aria-hidden="true">ಸಂ</div>
        <div className="dev onb-tag">पठामः • वदामः • प्रसारयामः</div>
        <h1>ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್</h1>
        <p className="lead">ದಿನಕ್ಕೆ ಐದು ನಿಮಿಷ. ಒಂದು ಪದ, ಒಂದು ವಾಕ್ಯ. ಅಷ್ಟೇ.</p>
        <Btn wide onClick={() => setStep(1)}>ಆರಂಭಿಸೋಣ</Btn>
      </>)}
      {step === 1 && (<>
        <h2>ಮೊದಲು ಒಂದು ಪ್ರಾಮಾಣಿಕ ಮಾತು</h2>
        <p className="lead">ಈ ಆ್ಯಪ್‌ನ ಪಾಠಗಳು ಪ್ರಾಥಮಿಕ ಸಂಸ್ಕೃತ ಪಠ್ಯಗಳಿಂದ ತೆಗೆದುಕೊಂಡವು. ಇನ್ನೂ ವಿದ್ವಾಂಸರ ಪರಿಶೀಲನೆ ಆಗಿಲ್ಲ.</p>
        <p className="lead">ಇಲ್ಲಿ ನಾವೆಲ್ಲರೂ ಕಲಿಯುವವರೇ — ನಡೆಸುವವರೂ ಸೇರಿದಂತೆ. ತಪ್ಪು ಕಂಡರೆ ಪ್ರತಿ ಪಾಠದ ಕೆಳಗಿನ <b>ತಪ್ಪು ತಿಳಿಸಿ</b> ಒತ್ತಿ. ಒಟ್ಟಿಗೆ ಸರಿಪಡಿಸೋಣ.</p>
        <div className="dev onb-tag">संस्कृतं सह पठामः।</div>
        <Btn wide onClick={() => setStep(2)}>ಒಪ್ಪಿಗೆ</Btn>
      </>)}
      {step === 2 && (<>
        <h2>ನಿಮ್ಮ ಹೆಸರು?</h2>
        <p className="muted">ನೀವು ಹಂಚಿಕೊಳ್ಳುವ ಸಂದೇಶಗಳ ಕೆಳಗೆ ಈ ಹೆಸರು ಬರುತ್ತದೆ. Google ಲಾಗಿನ್ ಆದರೆ ಪ್ರಗತಿಯೊಂದಿಗೆ ಉಳಿಯುತ್ತದೆ; ನೀವು ಒಪ್ಪಿದರೆ ಮಾತ್ರ ವಾರದ ಸಾಧಕರ ಪಟ್ಟಿಯಲ್ಲಿ ಕಾಣುತ್ತದೆ.</p>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="ಉದಾ: ಗುರುದತ್ತ" aria-label="ನಿಮ್ಮ ಹೆಸರು" />
        <Btn wide disabled={!name.trim()} onClick={() => onDone(name.trim())}>ಪ್ರವೇಶಿಸಿ 🙏</Btn>
      </>)}
    </div>
  );
}

/* ═══════════════════ home ═══════════════════ */
function Home({ api, setTab }) {
  const { s } = api;
  const words = visWords(s), sents = visSents(s);
  const w = words[dayNum() % words.length];
  const x = sents[dayNum() % sents.length];
  const next = words.find((v) => !s.learned.includes(v.id));
  const nextS = sents.find((v) => !s.sentences.includes(v.id));
  const U = visSubh(s), u = U.length ? U[dayNum() % U.length] : null, f = FS[s.fontStep];
  const due = dueItems(s);
  const plan = planToday(s);
  const items = [
    { k: "w", t: next ? "ಹೊಸ ಪದಗಳ ಪಾಠ" : "ಪದಗಳ ಅಭ್ಯಾಸ", d: next ? `ಪದ #${pad3(next.id)} ರಿಂದ, ಐದು ಪದ` : "ಎಲ್ಲಾ ಪದಗಳೂ ಕಲಿತಾಯಿತು 🎉", go: () => api.go({ kind: "lesson" }), done: plan.w },
    { k: "s", t: "ಒಂದು ವಾಕ್ಯ ಕಲಿಯಿರಿ", d: nextS ? `ವಾಕ್ಯ #${pad3(nextS.id)} — ${nextS.m}` : "ಎಲ್ಲಾ ವಾಕ್ಯಗಳೂ ಕಲಿತಾಯಿತು 🎉", go: () => api.go({ kind: "l2" }), done: plan.s },
    { k: "r", t: "ಪುನರಾವರ್ತನೆ", d: due.length ? `${due.length} ಬಾಕಿ — ಮರೆಯುವ ಮೊದಲು` : "ಇಂದು ಏನೂ ಬಾಕಿ ಇಲ್ಲ", go: () => due.length && api.go({ kind: "review" }), done: plan.r || !due.length },
    { k: "u", t: "ಇಂದಿನ ಸುಭಾಷಿತ", d: u ? u.t : "", go: () => u && api.go({ kind: "subhashita", id: u.id }), done: plan.u },
  ];
  const doneN = items.filter((i) => i.done).length;
  const wk = weekNum(), ch = challengeOfWeek();
  const ticks = s.challengeTicks[wk] || [false, false, false];
  const tick = (i) => api.update((st) => {
    const t = [...(st.challengeTicks[wk] || [false, false, false])]; t[i] = !t[i];
    const n = { ...st, challengeTicks: { ...st.challengeTicks, [wk]: t }, challengeAt: { ...(st.challengeAt || {}), [wk]: Date.now() } };
    if (t.every(Boolean)) setTimeout(() => api.flash("ಸವಾಲು ಪೂರ್ಣ ✅", { label: "ಹಂಚಿಕೊಳ್ಳಿ", run: () => api.share(shareChallenge(ch, n)) }), 50);
    return n;
  });
  const stat = (v, l) => <div className="stat"><b>{v}</b><span>{l}</span></div>;
  return (
    <>
      <div className="greet">
        <h1>ನಮಸ್ತೇ, {s.name} 🙏</h1>
        <div className="muted">ಇಂದಿನ ಗುರಿ — ಐದು ನಿಮಿಷ</div>
      </div>
      <div className="pad">
        <div className="card stats">{stat(`🔥 ${s.streak}`, "ಸರಣಿ")}{stat(`⭐ ${s.xp}`, "ಅಂಕ")}{stat(`📚 ${s.learned.length}`, "ಪದಗಳು")}{stat(`💬 ${s.sentences.length}`, "ವಾಕ್ಯಗಳು")}</div>

        <div className="card today plan">
          <div className="plan-h"><div className="sec-t">ಅಭ್ಯಾಸಃ — ಇಂದಿನ ಯೋಜನೆ</div><span className="lvl-p">{doneN} / {items.length}</span></div>
          {items.map((it) => (
            <button type="button" key={it.k} className={`tick${it.done ? " on" : ""}`} aria-pressed={it.done} onClick={it.go}>
              <span className="box">{it.done ? "✓" : ""}</span>
              <span className="lvl-b"><b>{it.t}</b><span className="muted small">{it.d}</span></span>
            </button>
          ))}
          {doneN === items.length
            ? <p className="muted center small">ಇಂದಿನ ಗುರಿ ಪೂರ್ಣ 🌿 ಬೇಕಿದ್ದರೆ ಇನ್ನೊಂದು ಪಾಠ ಮಾಡಿ.</p>
            : <Btn wide onClick={items.find((i) => !i.done).go}>{items.find((i) => !i.done).t} →</Btn>}
        </div>

        {w && <ScriptCard item={w} p={s} split={w.split} tip={w.tip} tag="ಶಬ್ದಃ — ಇಂದಿನ ಪದ"
          onShare={() => api.share(shareWord(w, s))} onReport={() => api.report("w", w.id, `ಪದ: ${w.d}`)} />}
        {x && <ScriptCard item={x} p={s} tag="ವಾಕ್ಯಮ್ — ಇಂದಿನ ವಾಕ್ಯ"
          onShare={() => api.share(shareSentence(x, s))} onReport={() => api.report("s", x.id, `ವಾಕ್ಯ: ${x.d}`)} />}
        {u && (
          <div className="card verse">
            <div className="tag">ಸುಭಾಷಿತಮ್ — ಇಂದಿನ ಸುಭಾಷಿತ</div>
            {s.showDeva && <div className="dev vdev" style={{ fontSize: 19 * f }}>{u.lines.map((l, i) => <div key={i}>{l[0]}</div>)}</div>}
            <div className="kan vkan" style={{ fontSize: 18 * f }}>{u.lines.map((l, i) => <div key={i}>{l[1]}</div>)}</div>
            <div className="mean" style={{ fontSize: 16 * f }}>{u.m}</div>
            <div className="card-foot"><span className="src">{u.from}</span><span className="foot-acts">
              <button type="button" className="link" onClick={() => api.share(shareSubhashita(u, s))}>ಹಂಚಿಕೊಳ್ಳಿ</button>
              <button type="button" className="link" onClick={() => api.go({ kind: "subhashita", id: u.id })}>ಪದಚ್ಛೇದ</button></span></div>
          </div>
        )}

        <div className="card">
          <div className="sec-t">ಸಪ್ತಾಹದ ಸವಾಲು</div>
          <p className="chal">{ch}</p>
          {["ಅಭ್ಯಾಸ ಮಾಡಿದೆ", "ಬಳಸಿದೆ", "ಪೂರ್ಣಗೊಳಿಸಿದೆ"].map((l, i) => (
            <button type="button" key={i} className={`tick${ticks[i] ? " on" : ""}`} aria-pressed={ticks[i]} onClick={() => tick(i)}>
              <span className="box">{ticks[i] ? "✓" : ""}</span>{l}
            </button>
          ))}
        </div>

        <div className="motto"><div className="dev">संस्कृतं सह पठामः।</div><div>ಸಂಸ್ಕೃತವನ್ನು ಒಟ್ಟಿಗೆ ಓದುತ್ತೇವೆ</div></div>
      </div>
    </>
  );
}

// today's line in the activity log: new items finished, and whether the day's plan is complete
function logToday(prev, n) {
  const today = dayKey();
  const added = Math.max(0, itemCount(n) - itemCount(prev));
  const p = n.plan;
  const planDone = !!(p && p.day === today && p.w && p.s && p.u && (p.r || !dueItems(n).length));
  const active = n.lastDay === today;
  if (!added && !planDone && !active) return n;
  const log = n.log || {};
  const cur = log[today];
  const nx = { n: (cur?.n || 0) + added, p: cur?.p || planDone ? 1 : 0 };
  if (cur && cur.n === nx.n && cur.p === nx.p) return n;
  return { ...n, log: { ...log, [today]: nx } };
}

function dueItems(s) {
  const w = visWords(s).filter((v) => s.learned.includes(v.id) && isDue(s, "w" + v.id)).map((v) => ({ t: "w", v }));
  const x = visSents(s).filter((v) => s.sentences.includes(v.id) && isDue(s, "s" + v.id)).map((v) => ({ t: "s", v }));
  const g = visGram(s).filter((v) => s.grammar.includes(v.id) && isDue(s, "g" + v.id)).map((v) => ({ t: "g", v }));
  const u = visSubh(s).filter((v) => s.subhashitas.includes(v.id) && isDue(s, "u" + v.id)).map((v) => ({ t: "u", v }));
  const r = visRead(s).filter((v) => s.readings.includes(v.id) && isDue(s, "r" + v.id)).map((v) => ({ t: "r", v }));
  return [...w, ...x, ...g, ...u, ...r];
}
// one review question for any kind of item
function reviewQ(x, s, i) {
  const W = visWords(s), S = visSents(s), G = visGram(s), U = visSubh(s);
  if (x.t === "w") return wordQ(x.v, W, s.showDeva);
  if (x.t === "s") return alignable(x.v) && x.v.parts.length >= 2 ? sentQ(x.v, S, i) : null;
  if (x.t === "g") return gramReviewQ(x.v, G, s.showDeva);
  if (x.t === "u") return Math.random() < 0.7 ? subhFillQ(x.v, U, s.showDeva) : gistQ(x.v, U);
  if (x.t === "r") return readQ(pick(x.v.qs, 1)[0], x.v);
  return null;
}

/* ═══════════════════ learn path ═══════════════════ */
function Learn({ api }) {
  const { s } = api;
  const W = visWords(s), S = visSents(s), D = visDias(s), G = visGram(s), U = visSubh(s), R = visRead(s);
  const lv = [
    { n: 0, t: "ಹಂತ 0 — ಪರಿಚಯ", d: "ಅಕ್ಷರ ಮತ್ತು ಉಚ್ಚಾರಣೆ", k: "l0", pr: s.l0done ? "ಮುಗಿದಿದೆ ✓" : "ಬಿಡಬಹುದು" },
    { n: 1, t: "ಹಂತ 1 — ಪ್ರಥಮಪದಾನಿ", d: `${W.length} ಪದಗಳು`, k: "l1", pr: `${s.learned.length} / ${W.length}` },
    { n: 2, t: "ಹಂತ 2 — ಸರಳವಾಕ್ಯಾನಿ", d: `${S.length} ವಾಕ್ಯಗಳು`, k: "l2", pr: `${s.sentences.length} / ${S.length}` },
    { n: 3, t: "ಹಂತ 3 — ಸಂವಾದಃ", d: `${D.length} ಸಂಭಾಷಣೆಗಳು`, k: "l3", pr: `${s.dialogues.length} / ${D.length}` },
    { n: 4, t: "ಹಂತ 4 — ಸರಳವ್ಯಾಕರಣಮ್", d: `${G.length} ಪಾಠಗಳು`, k: "l4", pr: `${s.grammar.length} / ${G.length}` },
    { n: 5, t: "ಹಂತ 5 — ಸುಭಾಷಿತಮ್", d: `${U.length} ಸುಭಾಷಿತಗಳು`, k: "l5", pr: `${s.subhashitas.length} / ${U.length}` },
    { n: 6, t: "ಹಂತ 6 — ವಾಚನಮ್", d: `${R.length} ವಾಚನಗಳು`, k: "l6", pr: `${s.readings.length} / ${R.length}` },
  ];
  return (
    <>
      <Header title="ಕಲಿಕೆಯ ಪಥ" sub="ನಿಮ್ಮದೇ ವೇಗದಲ್ಲಿ. ಯಾವಾಗ ಬೇಕಾದರೂ ಸೇರಬಹುದು." />
      <div className="pad path">
        {lv.map((l) => (
          <button type="button" key={l.n} className={`card lvl${l.lock ? " lock" : ""}`} disabled={l.lock}
            onClick={() => api.go({ kind: l.k })}>
            <span className="lvl-n">{l.n}</span>
            <span className="lvl-b"><b>{l.t}</b><span className="muted">{l.lock ? "ಶೀಘ್ರದಲ್ಲೇ" : l.d}</span></span>
            {!l.lock && <span className="lvl-p">{l.pr}</span>}
          </button>
        ))}
        <div className="card goal"><b>🪷 ಸಂಸ್ಕೃತಸಾಧಕಃ</b><span className="muted">{s.badges.includes("b15") ? "ಪ್ರಯಾಣದ ಗುರಿ ತಲುಪಿದಿರಿ ✓" : `ಪ್ರಯಾಣದ ಗುರಿ — ${stagesDone(s)} / 6 ಹಂತ ಪೂರ್ಣ`}</span></div>
      </div>
    </>
  );
}

/* ── level 0 ── */
function Level0({ api }) {
  const { s } = api;
  const [quiz, setQuiz] = useState(null);
  const [res, setRes] = useState(null);
  const all = [...VOWELS, ...CONSONANTS.flatMap((r) => r.items)];
  const f = FS[s.fontStep];
  if (res) return <Done api={api} title="ಅಕ್ಷರ ಅಭ್ಯಾಸ ಪೂರ್ಣ" line={`${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.`} />;
  if (quiz) return <Quiz qs={quiz} p={s} title="ಅಕ್ಷರ ಅಭ್ಯಾಸ" onBack={() => setQuiz(null)}
    onGrade={() => {}} onFinish={(sc, t) => { api.update((st) => touch({ ...st, l0done: true, xp: st.xp + sc })); setRes({ s: sc, t }); }} />;
  const cell = ([dv, kn], i) => (
    <div key={i} className="pair"><span className="dev" style={{ fontSize: 26 * f }}>{dv}</span><span style={{ fontSize: 22 * f }}>{kn}</span></div>
  );
  return (
    <>
      <Header title="ಹಂತ 0 — ಪರಿಚಯ" sub="ದೇವನಾಗರಿ ಮತ್ತು ಕನ್ನಡ ಅಕ್ಷರಗಳ ಜೋಡಿ" onBack={api.close} />
      <div className="pad">
        <p className="lead">ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಸಂಸ್ಕೃತದ ಎಲ್ಲಾ ಅಕ್ಷರಗಳೂ ಇವೆ. ಹಾಗಾಗಿ ದೇವನಾಗರಿ ಗೊತ್ತಿಲ್ಲದಿದ್ದರೂ ನೀವು ಸರಿಯಾಗಿ ಉಚ್ಚರಿಸಬಲ್ಲಿರಿ. ಕೆಳಗಿನ ಜೋಡಿಗಳನ್ನು ನೋಡಿ.</p>
        <div className="sec-t">ಸ್ವರಗಳು</div>
        <div className="grid">{VOWELS.map(cell)}</div>
        <div className="sec-t">ವ್ಯಂಜನಗಳು</div>
        {CONSONANTS.map((r) => (
          <div key={r.row} className="crow">
            <div className="muted small">{r.row}{r.note ? ` — ${r.note}` : ""}</div>
            <div className="grid">{r.items.map(cell)}</div>
          </div>
        ))}
        <div className="sec-t">ಗಮನಿಸಬೇಕಾದದ್ದು</div>
        {NOTES.map((n) => <div key={n.t} className="card note"><b>{n.t}</b><p>{n.d}</p></div>)}
        <Btn wide onClick={() => setQuiz(pick(all, 10).map((pr) => letterQ(pr, all)))}>ಅಕ್ಷರ ಅಭ್ಯಾಸ (10 ಪ್ರಶ್ನೆ)</Btn>
        <Btn wide kind="line" onClick={() => { api.update((st) => touch({ ...st, l0done: true })); api.close(); }}>ಮುಗಿಯಿತು</Btn>
      </div>
    </>
  );
}

/* ── level 1: modules ── */
function Level1({ api }) {
  const { s } = api;
  const W = visWords(s);
  return (
    <>
      <Header title="ಹಂತ 1 — ಪ್ರಥಮಪದಾನಿ" sub="ಘಟಕವನ್ನು ಆರಿಸಿ. ಒಂದು ಪಾಠದಲ್ಲಿ ಐದು ಪದ." onBack={api.close} />
      <div className="pad">
        {MODULES.map((m) => {
          const ws = W.filter((w) => w.mod === m.n);
          if (!ws.length) return null;
          const done = ws.filter((w) => s.learned.includes(w.id)).length;
          return (
            <button type="button" key={m.n} className="card lvl" onClick={() => api.go({ kind: "lesson", mod: m.n })}>
              <span className="lvl-n">{String(m.n).padStart(2, "0")}</span>
              <span className="lvl-b"><b>{m.t}</b><span className="muted">{m.s}</span></span>
              <span className="lvl-p">{done} / {ws.length}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ── word lesson: ಕಲಿ → ಓದು → ಹೇಳು → ಅರ್ಥ → ಬಳಸು → ಅಭ್ಯಾಸ → ಪೂರ್ಣ ── */
function Lesson({ api, mod }) {
  const { s } = api;
  const [set] = useState(() => {
    const W = visWords(s).filter((w) => (mod ? w.mod === mod : true));
    const fresh = W.filter((w) => !s.learned.includes(w.id));
    // all learned → five random words to revise, not always the same first five
    return fresh.length ? fresh.slice(0, 5) : pick(W, 5);
  });
  const [isNew] = useState(() => set.some((w) => !s.learned.includes(w.id)));
  const sents = visSents(s);
  const steps = useMemo(() => set.flatMap((w) => {
    const u = usageOf(w, sents);
    return u ? [{ t: "learn", w }, { t: "use", w, u }] : [{ t: "learn", w }];
  }), [set]);
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("learn");
  const [res, setRes] = useState(null);
  const qs = useMemo(() => {
    const pool = visWords(s);
    const q = set.map((w) => wordQ(w, pool, s.showDeva));
    if (distinct(set, 4).length === 4) q.push(matchQ(set));
    return shuffle(q);
  }, [set]);
  useEffect(() => { window.scrollTo(0, 0); }, [i, phase]);

  if (!set.length) return <><Header title="ಪಾಠ" onBack={api.close} /><div className="pad"><p className="lead">ಈ ಘಟಕದಲ್ಲಿ ಪದಗಳಿಲ್ಲ.</p></div></>;
  if (res) return (
    <Done api={api} title="ಅದ್ಭುತಮ್ 🎉" line={isNew
      ? `ಇಂದು ನೀವು ${set.length} ಹೊಸ ಸಂಸ್ಕೃತ ಪದಗಳನ್ನು ಕಲಿತಿರಿ. ಅಭ್ಯಾಸದಲ್ಲಿ ${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.`
      : `${set.length} ಪದಗಳನ್ನು ಮತ್ತೆ ಅಭ್ಯಾಸ ಮಾಡಿದಿರಿ. ${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.`}
      shareText={isNew ? shareLesson(set, s) : null} />
  );
  if (phase === "quiz") return <Quiz qs={qs} p={s} title="ಅಭ್ಯಾಸ" onBack={api.close} onGrade={api.grade} onFinish={(sc, t) => { setRes({ s: sc, t }); api.plan("w"); }} />;

  const st = steps[i];
  const w = st.w;
  const modT = MODULES.find((m) => m.n === w.mod)?.t;
  const nextStep = () => {
    if (st.t === "learn") api.learnWord(w.id);
    if (i + 1 < steps.length) setI(i + 1); else setPhase("quiz");
  };
  return (
    <>
      <Header title={`ಪಾಠ — ${modT}`} sub={`ಪದ #${pad3(w.id)} · ${set.indexOf(w) + 1} / ${set.length}`} onBack={api.close} />
      <div className="pad">
        <Bar now={i + 1} total={steps.length + 1} />
        {st.t === "learn" ? (<>
          <ScriptCard item={w} p={s} split={w.split} tip={w.tip} onReport={() => api.report("w", w.id, `ಪದ: ${w.d}`)} />
          <div className="card say"><b>ಹೇಳಿ</b><p>ಕನ್ನಡ ಲಿಪಿಯನ್ನು ನೋಡಿ, ಅಕ್ಷರ ಬಿಡಿಸಿ, ಗಟ್ಟಿಯಾಗಿ ಮೂರು ಬಾರಿ ಹೇಳಿ — <span className="kan-inl">{w.k}</span></p></div>
        </>) : (<>
          <div className="sec-t">ಬಳಸು — ಈ ಪದ ವಾಕ್ಯದೊಳಗೆ</div>
          <ScriptCard item={st.u} p={s} tag={`ವಾಕ್ಯ #${pad3(st.u.id)}`} onReport={() => api.report("s", st.u.id, `ವಾಕ್ಯ: ${st.u.d}`)}>
            <Parts parts={st.u.parts} p={s} />
          </ScriptCard>
        </>)}
        <Btn wide onClick={nextStep}>{i + 1 < steps.length ? "ಮುಂದೆ" : "ಅಭ್ಯಾಸಕ್ಕೆ"}</Btn>
      </div>
    </>
  );
}

function Done({ api, title, line, shareText }) {
  const [offered, setOffered] = useState(!!shareText);
  return (
    <>
      <Header title="ಪೂರ್ಣ" onBack={api.close} />
      <div className="pad done">
        <div className="done-t">{title}</div>
        <p className="lead">{line}</p>
        {offered && (
          <div className="card">
            <p>ಕಲಿತದ್ದನ್ನು ಮಂಡಲದಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳುವಿರಾ? ಬೇಡವಾದರೆ ಬಿಟ್ಟುಬಿಡಿ.</p>
            <Btn wide kind="line" onClick={() => { setOffered(false); api.share(shareText); }}>ಹಂಚಿಕೊಳ್ಳಿ</Btn>
          </div>
        )}
        <Btn wide onClick={api.close}>ಮನೆಗೆ</Btn>
      </div>
    </>
  );
}

/* ── level 2: sentences ── */
function Level2({ api }) {
  const { s } = api;
  const S = visSents(s);
  const [open, setOpen] = useState(null);
  const learned = S.filter((x) => s.sentences.includes(x.id));
  const mark = (x) => { api.update((st) => touch(st.sentences.includes(x.id) ? st
    : seedSrs({ ...st, sentences: [...st.sentences, x.id], xp: st.xp + 3 }, "s" + x.id))); api.plan("s"); };
  return (
    <>
      <Header title="ಹಂತ 2 — ಸರಳವಾಕ್ಯಾನಿ" sub="ವಾಕ್ಯ ಒತ್ತಿದರೆ ಪದಚ್ಛೇದ ಕಾಣುತ್ತದೆ" onBack={api.close} />
      <div className="pad">
        {learned.filter((x) => x.parts.length >= 2).length >= 2 && <Btn wide onClick={() => api.go({ kind: "squiz" })}>ವಾಕ್ಯ ಅಭ್ಯಾಸ</Btn>}
        {MODULES.map((m) => {
          const xs = S.filter((x) => x.mod === m.n);
          if (!xs.length) return null;
          return (
            <div key={m.n}>
              <div className="sec-t">{m.t} <span className="muted">— {m.s}</span></div>
              {xs.map((x) => {
                const isOpen = open === x.id, done = s.sentences.includes(x.id);
                return (
                  <div key={x.id} className={`card sent${done ? " done" : ""}`}>
                    <button type="button" className="sent-h" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : x.id)}>
                      <span className="muted small">ವಾಕ್ಯ #{pad3(x.id)}{done ? " · ಕಲಿತಿದ್ದೀರಿ ✓" : ""}</span>
                      {s.showDeva && <span className="dev" style={{ fontSize: 22 * FS[s.fontStep] }}>{x.d}</span>}
                      <span className="kan" style={{ fontSize: 20 * FS[s.fontStep] }}>{x.k}</span>
                      <span className="mean">{x.m}</span>
                    </button>
                    {isOpen && (<>
                      <Parts parts={x.parts} p={s} />
                      <div className="row">
                        {!done && <Btn small onClick={() => mark(x)}>ಕಲಿತೆ</Btn>}
                        <Btn small kind="line" onClick={() => api.share(shareSentence(x, s))}>ಹಂಚಿಕೊಳ್ಳಿ</Btn>
                      </div>
                      <div className="card-foot"><SrcLine item={x} /><button type="button" className="link warn" onClick={() => api.report("s", x.id, `ವಾಕ್ಯ: ${x.d}`)}>ತಪ್ಪು ತಿಳಿಸಿ</button></div>
                    </>)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

function SentenceQuiz({ api }) {
  const { s } = api;
  const [res, setRes] = useState(null);
  const qs = useMemo(() => {
    const S = visSents(s);
    const mine = S.filter((x) => s.sentences.includes(x.id) && alignable(x) && x.parts.length >= 2);
    return pick(mine, 8).map((x, i) => sentQ(x, S, i));
  }, []);
  if (res || !qs.length) return <Done api={api} title="ವಾಕ್ಯ ಅಭ್ಯಾಸ ಪೂರ್ಣ" line={res ? `${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.` : "ಮೊದಲು ಕೆಲವು ವಾಕ್ಯಗಳನ್ನು ಕಲಿಯಿರಿ."} />;
  return <Quiz qs={qs} p={s} title="ವಾಕ್ಯ ಅಭ್ಯಾಸ" onBack={api.close} onGrade={api.grade} onFinish={(sc, t) => setRes({ s: sc, t })} />;
}

/* ── level 3: dialogues ── */
function Level3({ api }) {
  const { s } = api;
  const D = visDias(s);
  return (
    <>
      <Header title="ಹಂತ 3 — ಸಂವಾದಃ" sub="ದಿನನಿತ್ಯದ ಸಂಭಾಷಣೆ" onBack={api.close} />
      <div className="pad">
        {D.map((d) => (
          <button type="button" key={d.id} className="card lvl" onClick={() => api.go({ kind: "dialogue", id: d.id })}>
            <span className="lvl-n">{d.id}</span>
            <span className="lvl-b"><b>{d.t}</b><span className="muted">{d.lines.length} ಸಾಲುಗಳು</span></span>
            <span className="lvl-p">{s.dialogues.includes(d.id) ? "✓" : ""}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function Dialogue({ api, id }) {
  const { s } = api;
  const d = DIALOGUES.find((x) => x.id === id);
  const [quiz, setQuiz] = useState(null);
  const [res, setRes] = useState(null);
  const f = FS[s.fontStep];
  if (res) return <Done api={api} title="ಸಂವಾದ ಅಭ್ಯಾಸ ಪೂರ್ಣ" line={`${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.`} />;
  if (quiz) return <Quiz qs={quiz} p={s} title="ಸಂವಾದ ಅಭ್ಯಾಸ" onBack={() => setQuiz(null)} onGrade={() => {}}
    onFinish={(sc, t) => { api.update((st) => touch({ ...st, xp: st.xp + sc })); setRes({ s: sc, t }); }} />;
  const done = s.dialogues.includes(d.id);
  return (
    <>
      <Header title={d.t} sub="ಪ್ರತಿ ಸಾಲನ್ನೂ ಗಟ್ಟಿಯಾಗಿ ಹೇಳಿ" onBack={() => api.go({ kind: "l3" })} />
      <div className="pad">
        {d.lines.map(([sp, dv, kn, mn], i) => (
          <div key={i} className={`bubble ${sp === "ಅ" ? "l" : "r"}`}>
            <span className="who">{sp}</span>
            {s.showDeva && <div className="dev" style={{ fontSize: 20 * f }}>{dv}</div>}
            <div className="kan" style={{ fontSize: 19 * f }}>{kn}</div>
            <div className="mean">{mn}</div>
          </div>
        ))}
        <div className="card-foot"><SrcLine item={d} /><button type="button" className="link warn" onClick={() => api.report("d", d.id, `ಸಂವಾದ: ${d.t}`)}>ತಪ್ಪು ತಿಳಿಸಿ</button></div>
        {!done && <Btn wide onClick={() => api.update((st) => touch({ ...st, dialogues: [...st.dialogues, d.id], xp: st.xp + 10 }))}>ಕಲಿತೆ</Btn>}
        {done && <div className="muted center">ಕಲಿತಿದ್ದೀರಿ ✓</div>}
        <Btn wide kind="line" onClick={() => setQuiz(d.lines.slice(0, -1).map((_, i) => nextLineQ(d, i, visDias(s))))}>ಸಂವಾದ ಅಭ್ಯಾಸ</Btn>
      </div>
    </>
  );
}

/* ── level 4: grammar ── */
function Level4({ api }) {
  const { s } = api;
  const G = visGram(s);
  return (
    <>
      <Header title="ಹಂತ 4 — ಸರಳವ್ಯಾಕರಣಮ್" sub="ಒಂದೊಂದು ನಿಯಮ, ಉದಾಹರಣೆ, ಅಭ್ಯಾಸ" onBack={api.close} />
      <div className="pad">
        {G.map((g) => (
          <button type="button" key={g.id} className="card lvl" onClick={() => api.go({ kind: "grammar", id: g.id })}>
            <span className="lvl-n">{g.id}</span>
            <span className="lvl-b"><b>{g.t}</b>{s.showDeva && <span className="muted dev">{g.d}</span>}</span>
            <span className="lvl-p">{s.grammar.includes(g.id) ? "✓" : ""}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function GrammarLesson({ api, id }) {
  const { s } = api;
  const g = GRAMMAR.find((x) => x.id === id);
  const [quiz, setQuiz] = useState(null);
  const [res, setRes] = useState(null);
  const f = FS[s.fontStep];
  if (!g) return <><Header title="ವ್ಯಾಕರಣ" onBack={api.close} /><div className="pad"><p className="lead">ಈ ಪಾಠ ಸಿಗಲಿಲ್ಲ.</p></div></>;
  if (res) return <Done api={api} title="ವ್ಯಾಕರಣ ಅಭ್ಯಾಸ ಪೂರ್ಣ" line={`${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.`} />;
  if (quiz) return <Quiz qs={quiz} p={s} title={g.t} onBack={() => setQuiz(null)} onGrade={() => {}}
    onFinish={(sc, t) => { api.update((st) => touch(seedSrs({ ...st, grammar: st.grammar.includes(g.id) ? st.grammar : [...st.grammar, g.id], xp: st.xp + sc + 5 }, "g" + g.id))); setRes({ s: sc, t }); }} />;
  const done = s.grammar.includes(g.id);
  return (
    <>
      <Header title={g.t} sub={s.showDeva ? g.d : undefined} onBack={() => api.go({ kind: "l4" })} />
      <div className="pad">
        {g.intro.map((p, i) => <p key={i} className="lead">{p}</p>)}
        <div className="sec-t">ಉದಾಹರಣೆಗಳು</div>
        <div className="card gtable">
          {g.rows.map((r, i) => (
            <div key={i} className="grow">
              {r[0] && <span className="glabel">{r[0]}</span>}
              {s.showDeva && <span className="dev" style={{ fontSize: 19 * f }}>{r[1]}</span>}
              <span className="kan" style={{ fontSize: 18 * f }}>{r[2]}</span>
              <span className="mean" style={{ fontSize: 15 * f, marginTop: 0 }}>{r[3]}</span>
            </div>
          ))}
        </div>
        {g.tip && <div className="tip">💡 {g.tip}</div>}
        <div className="card-foot"><SrcLine item={g} /><button type="button" className="link warn" onClick={() => api.report("g", g.id, `ವ್ಯಾಕರಣ: ${g.t}`)}>ತಪ್ಪು ತಿಳಿಸಿ</button></div>
        <Btn wide onClick={() => setQuiz(grammarQuiz(g, visGram(s), s.showDeva))}>ಅಭ್ಯಾಸ (6 ಪ್ರಶ್ನೆ)</Btn>
        <p className="muted small center">ಪ್ರತಿ ಬಾರಿ ಬೇರೆ ಪ್ರಶ್ನೆಗಳು — ಕೋಷ್ಟಕದಿಂದಲೂ ಪ್ರಶ್ನೆ ಬರುತ್ತದೆ.</p>
        {done && <div className="muted center">ಮುಗಿದಿದೆ ✓</div>}
      </div>
    </>
  );
}

/* ── level 5: subhashitas ── */
function Level5({ api }) {
  const { s } = api;
  const U = visSubh(s);
  const learned = U.filter((v) => s.subhashitas.includes(v.id));
  return (
    <>
      <Header title="ಹಂತ 5 — ಸುಭಾಷಿತಮ್" sub="ಒಂದು ಶ್ಲೋಕ, ಒಂದು ಜೀವನಪಾಠ" onBack={api.close} />
      <div className="pad">
        {learned.length >= 2 && <Btn wide onClick={() => api.go({ kind: "uquiz" })}>ಸುಭಾಷಿತ ಅಭ್ಯಾಸ</Btn>}
        {U.map((v) => (
          <button type="button" key={v.id} className="card lvl" onClick={() => api.go({ kind: "subhashita", id: v.id })}>
            <span className="lvl-n">{v.id}</span>
            <span className="lvl-b"><b>{v.t}</b><span className="muted">{v.lines[0][1]} …</span></span>
            <span className="lvl-p">{s.subhashitas.includes(v.id) ? "✓" : ""}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function Subhashita({ api, id }) {
  const { s } = api;
  const v = SUBHASHITAS.find((x) => x.id === id);
  const [showParts, setShowParts] = useState(false);
  const f = FS[s.fontStep];
  const U = visSubh(s);
  const isToday = !!v && U.length > 0 && U[dayNum() % U.length].id === v.id;
  useEffect(() => { if (isToday) api.plan("u"); }, [isToday]);   // reading today's verse counts
  if (!v) return <><Header title="ಸುಭಾಷಿತ" onBack={api.close} /><div className="pad"><p className="lead">ಈ ಸುಭಾಷಿತ ಸಿಗಲಿಲ್ಲ.</p></div></>;
  const done = s.subhashitas.includes(v.id);
  const mark = () => { api.update((st) => touch(st.subhashitas.includes(v.id) ? st : seedSrs({ ...st, subhashitas: [...st.subhashitas, v.id], xp: st.xp + 8 }, "u" + v.id))); api.plan("u"); };
  return (
    <>
      <Header title={v.t} sub={`ಸುಭಾಷಿತ #${pad3(v.id)} · ${v.from}`} onBack={() => api.go({ kind: "l5" })} />
      <div className="pad">
        <div className="card verse">
          {s.showDeva && <div className="dev vdev" style={{ fontSize: 22 * f }}>{v.lines.map((l, i) => <div key={i}>{l[0]}</div>)}</div>}
          <div className="kan vkan" style={{ fontSize: 20 * f }}>{v.lines.map((l, i) => <div key={i}>{l[1]}</div>)}</div>
          <div className="mean" style={{ fontSize: 17 * f }}>{v.m}</div>
          <div className="card-foot"><SrcLine item={v} /><span className="foot-acts">
            <button type="button" className="link" onClick={() => api.share(shareSubhashita(v, s))}>ಹಂಚಿಕೊಳ್ಳಿ</button>
            <button type="button" className="link warn" onClick={() => api.report("u", v.id, `ಸುಭಾಷಿತ: ${v.lines[0][0]}`)}>ತಪ್ಪು ತಿಳಿಸಿ</button></span></div>
        </div>
        <div className="card say"><b>ಹೇಳಿ</b><p>ಪ್ರತಿ ಸಾಲನ್ನು ಗಟ್ಟಿಯಾಗಿ ಎರಡು ಬಾರಿ ಹೇಳಿ. ನಂತರ ಅರ್ಥವನ್ನು ನಿಮ್ಮ ಮಾತಿನಲ್ಲಿ ಹೇಳಿ.</p></div>
        <Btn wide kind="line" onClick={() => setShowParts(!showParts)}>{showParts ? "ಪದಚ್ಛೇದ ಮುಚ್ಚಿ" : "ಪದಚ್ಛೇದ ನೋಡಿ"}</Btn>
        {showParts && (
          <div className="card"><div className="parts" style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
            <div className="parts-h">ಪದಚ್ಛೇದ</div>
            {v.parts.map(([dv, mn], i) => <div key={i} className="part"><span className="dev">{dv}</span><span className="part-m">{mn}</span></div>)}
          </div></div>
        )}
        {!done ? <Btn wide onClick={mark}>ಕಂಠಪಾಠವಾಯಿತು</Btn> : <div className="muted center">ಕಲಿತಿದ್ದೀರಿ ✓</div>}
      </div>
    </>
  );
}

function SubhashitaQuiz({ api }) {
  const { s } = api;
  const [res, setRes] = useState(null);
  const qs = useMemo(() => {
    const U = visSubh(s);
    const mine = U.filter((v) => s.subhashitas.includes(v.id));
    return shuffle(pick(mine, 6).flatMap((v, i) => [subhFillQ(v, U, s.showDeva), ...(i < 3 ? [gistQ(v, U)] : [])]));
  }, []);
  if (res || !qs.length) return <Done api={api} title="ಸುಭಾಷಿತ ಅಭ್ಯಾಸ ಪೂರ್ಣ" line={res ? `${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.` : "ಮೊದಲು ಕೆಲವು ಸುಭಾಷಿತ ಕಲಿಯಿರಿ."} />;
  return <Quiz qs={qs} p={s} title="ಸುಭಾಷಿತ ಅಭ್ಯಾಸ" onBack={api.close} onGrade={() => {}}
    onFinish={(sc, t) => { api.update((st) => touch({ ...st, xp: st.xp + sc })); setRes({ s: sc, t }); }} />;
}

// mixed grammar practice across the lessons the learner has completed
function GrammarQuiz({ api }) {
  const { s } = api;
  const [res, setRes] = useState(null);
  const qs = useMemo(() => {
    const G = visGram(s);
    const mine = G.filter((g) => s.grammar.includes(g.id));
    const pool = mine.length ? mine : G;
    const out = []; const seen = new Set();
    for (let i = 0; i < 40 && out.length < 8; i++) {
      const g = pool[Math.floor(Math.random() * pool.length)];
      const q = gramReviewQ(g, G, s.showDeva);
      if (q && !seen.has(q.prompt)) { seen.add(q.prompt); out.push(q); }
    }
    return out;
  }, []);
  if (res || !qs.length) return <Done api={api} title="ವ್ಯಾಕರಣ ಅಭ್ಯಾಸ ಪೂರ್ಣ" line={res ? `${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ. ತಪ್ಪಾದವು ತಪ್ಪುಗಳ ಪುಸ್ತಕದಲ್ಲಿ ಸೇರಿವೆ.` : "ಮೊದಲು ಒಂದು ವ್ಯಾಕರಣ ಪಾಠ ಮುಗಿಸಿ."} />;
  return <Quiz qs={qs} p={s} title="ವ್ಯಾಕರಣ ಅಭ್ಯಾಸ" onBack={api.close} onGrade={api.grade}
    onFinish={(sc, t) => { api.update((st) => touch({ ...st, xp: st.xp + sc })); setRes({ s: sc, t }); }} />;
}

/* ── level 6: readings ── */
function Level6({ api }) {
  const { s } = api;
  const R = visRead(s);
  return (
    <>
      <Header title="ಹಂತ 6 — ವಾಚನಮ್" sub="ಸರಳ ಗದ್ಯ — ಓದಿ, ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳಿ" onBack={api.close} />
      <div className="pad">
        {R.map((r) => (
          <button type="button" key={r.id} className="card lvl" onClick={() => api.go({ kind: "reading", id: r.id })}>
            <span className="lvl-n">{r.id}</span>
            <span className="lvl-b"><b>{r.t}</b><span className="muted">{r.lines.length} ವಾಕ್ಯಗಳು · {r.words.length} ಹೊಸ ಪದ</span></span>
            <span className="lvl-p">{s.readings.includes(r.id) ? "✓" : ""}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function Reading({ api, id }) {
  const { s } = api;
  const r = READINGS.find((x) => x.id === id);
  const [open, setOpen] = useState({});
  const [all, setAll] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [res, setRes] = useState(null);
  const f = FS[s.fontStep];
  if (!r) return <><Header title="ವಾಚನ" onBack={api.close} /><div className="pad"><p className="lead">ಈ ವಾಚನ ಸಿಗಲಿಲ್ಲ.</p></div></>;
  if (res) return <Done api={api} title="ವಾಚನ ಪೂರ್ಣ" line={`${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.`} />;
  if (quiz) return <Quiz qs={quiz} p={s} title={r.t} onBack={() => setQuiz(null)} onGrade={() => {}}
    onFinish={(sc, t) => { api.update((st) => touch(seedSrs({ ...st, readings: st.readings.includes(r.id) ? st.readings : [...st.readings, r.id], xp: st.xp + sc + 5 }, "r" + r.id))); setRes({ s: sc, t }); }} />;
  const done = s.readings.includes(r.id);
  return (
    <>
      <Header title={r.t} sub="ವಾಕ್ಯ ಒತ್ತಿದರೆ ಅರ್ಥ ಕಾಣುತ್ತದೆ" onBack={() => api.go({ kind: "l6" })} />
      <div className="pad">
        <Btn small kind="line" onClick={() => setAll(!all)}>{all ? "ಅರ್ಥ ಮುಚ್ಚಿ" : "ಎಲ್ಲಾ ಅರ್ಥ ತೋರಿಸು"}</Btn>
        <div className="card passage">
          {r.lines.map(([dv, kn, mn], i) => {
            const show = all || !!open[i];
            return (
              <button type="button" key={i} className={`rline${show ? " on" : ""}`} aria-expanded={show} onClick={() => setOpen({ ...open, [i]: !open[i] })}>
                {s.showDeva && <span className="dev" style={{ fontSize: 21 * f }}>{dv}</span>}
                <span className="kan" style={{ fontSize: 19 * f }}>{kn}</span>
                {show && <span className="mean" style={{ fontSize: 16 * f }}>{mn}</span>}
              </button>
            );
          })}
        </div>
        <div className="sec-t">ಹೊಸ ಪದಗಳು</div>
        <div className="card gtable">
          {r.words.map(([dv, kn, mn], i) => (
            <div key={i} className="grow">{s.showDeva && <span className="dev">{dv}</span>}<span className="kan">{kn}</span><span className="mean" style={{ marginTop: 0 }}>{mn}</span></div>
          ))}
        </div>
        <div className="card-foot"><SrcLine item={r} /><button type="button" className="link warn" onClick={() => api.report("r", r.id, `ವಾಚನ: ${r.t}`)}>ತಪ್ಪು ತಿಳಿಸಿ</button></div>
        <Btn wide onClick={() => setQuiz(r.qs.map((q) => readQ(q)))}>ಗ್ರಹಿಕೆಯ ಪ್ರಶ್ನೆಗಳು ({r.qs.length})</Btn>
        {done && <div className="muted center">ಮುಗಿದಿದೆ ✓</div>}
      </div>
    </>
  );
}

/* ═══════════════════ practice ═══════════════════ */
function Practice({ api }) {
  const { s } = api;
  const W = visWords(s);
  const counts = [0, 0, 0, 0];
  W.forEach((w) => counts[wordState(s, w.id)]++);
  const due = dueItems(s);
  const labels = ["ಹೊಸದು", "ಕಲಿಯುತ್ತಿದೆ", "ಪುನರಾವರ್ತನೆ ಬೇಕು", "ಕರಗತ"];
  // same rule SentenceQuiz uses, so the button never opens an empty quiz
  const sentOk = visSents(s).filter((x) => s.sentences.includes(x.id) && alignable(x) && x.parts.length >= 2).length >= 1;
  return (
    <>
      <Header title="ಅಭ್ಯಾಸ" sub="ಮರೆಯುವ ಮೊದಲು ಮತ್ತೊಮ್ಮೆ" />
      <div className="pad">
        <div className="card stats">{labels.map((l, i) => <div key={i} className="stat"><b>{counts[i]}</b><span>{l}</span></div>)}</div>
        <Btn wide disabled={!due.length} onClick={() => api.go({ kind: "review" })}>ಇಂದಿನ ಪುನರಾವರ್ತನೆ ({due.length})</Btn>
        {!due.length && <p className="muted center">ಇಂದು ಪುನರಾವರ್ತಿಸಲು ಏನೂ ಇಲ್ಲ. ಹೊಸ ಪಾಠ ಆರಂಭಿಸಿ 🌿</p>}
        {[
          [!sentOk, "squiz", "ವಾಕ್ಯ ಅಭ್ಯಾಸ", "ಹಂತ 2 ರಲ್ಲಿ ವಾಕ್ಯ ಕಲಿತ ಮೇಲೆ ತೆರೆಯುತ್ತದೆ"],
          [!s.learned.length, "flash", "ಫ್ಲ್ಯಾಶ್ ಕಾರ್ಡ್", "ಮೊದಲ ಪದ ಕಲಿತ ಮೇಲೆ ತೆರೆಯುತ್ತದೆ"],
          [!s.mistakes.length, "mistakes", `ತಪ್ಪುಗಳ ಪುಸ್ತಕ (${s.mistakes.length})`, "ತಪ್ಪಾದ ಉತ್ತರಗಳು ಇಲ್ಲಿ ಸೇರುತ್ತವೆ — ಸದ್ಯ ಯಾವುದೂ ಇಲ್ಲ"],
          [s.subhashitas.length < 2, "uquiz", "ಸುಭಾಷಿತ ಅಭ್ಯಾಸ", "ಹಂತ 5 ರಲ್ಲಿ 2 ಸುಭಾಷಿತ ಕಲಿತ ಮೇಲೆ ತೆರೆಯುತ್ತದೆ"],
          [!s.grammar.length, "gquiz", "ವ್ಯಾಕರಣ ಅಭ್ಯಾಸ", "ಹಂತ 4 ರಲ್ಲಿ ಮೊದಲ ಪಾಠ ಮುಗಿಸಿದ ಮೇಲೆ ತೆರೆಯುತ್ತದೆ"],
        ].map(([off, kind, label, why]) => (
          <div key={kind}>
            <Btn wide kind="line" disabled={off} onClick={() => api.go(kind === "mistakes" ? { kind: "review", mistakes: true } : { kind })}>{label}</Btn>
            {off && <p className="muted small center btn-why">{why}</p>}
          </div>
        ))}
        <div className="card">
          <div className="sec-t">ಶಬ್ದಕೋಶ</div>
          <p className="muted">ಕನ್ನಡ ಅಥವಾ ಸಂಸ್ಕೃತ — ಯಾವ ಪದವನ್ನಾದರೂ ಹುಡುಕಿ.</p>
          <Btn wide kind="line" onClick={() => api.go({ kind: "search" })}>ಪದ ಹುಡುಕಿ</Btn>
        </div>
      </div>
    </>
  );
}

function Review({ api, mistakes }) {
  const { s } = api;
  const [res, setRes] = useState(null);
  const qs = useMemo(() => {
    let items;
    if (mistakes) {
      const lists = { w: visWords(s), s: visSents(s), g: visGram(s), u: visSubh(s), r: visRead(s) };
      items = s.mistakes.map((k) => ({ t: k[0], v: (lists[k[0]] || []).find((v) => k[0] + v.id === k) })).filter((x) => x.v);
    } else items = dueItems(s);
    items = shuffle(items).slice(0, 12);
    const ws = items.filter((x) => x.t === "w").map((x) => x.v);
    const q = items.map((x, i) => reviewQ(x, s, i)).filter(Boolean);
    if (!mistakes && ws.length >= 6 && distinct(ws, 4).length === 4) q.push(matchQ(ws));
    return shuffle(q);
  }, []);
  const title = mistakes ? "ತಪ್ಪುಗಳ ಪುಸ್ತಕ" : "ಪುನರಾವರ್ತನೆ";
  if (!qs.length) return <><Header title={title} onBack={api.close} /><div className="pad"><p className="lead">ಇಂದು ಪುನರಾವರ್ತಿಸಲು ಏನೂ ಇಲ್ಲ. ಹೊಸ ಪಾಠ ಆರಂಭಿಸಿ 🌿</p><Btn wide onClick={api.close}>ಹಿಂದೆ</Btn></div></>;
  if (res) return <Done api={api} title="ಸಾಧು 🌿" line={`${title} ಪೂರ್ಣ — ${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ. ತಪ್ಪಾದವು ತಪ್ಪುಗಳ ಪುಸ್ತಕದಲ್ಲಿ ಸೇರಿವೆ. ಮತ್ತೆ ಬರುತ್ತವೆ.`} />;
  return <Quiz qs={qs} p={s} title={title} onBack={api.close} onGrade={api.grade} onFinish={(sc, t) => { setRes({ s: sc, t }); if (!mistakes) api.plan("r"); }} />;
}

function Flash({ api }) {
  const { s } = api;
  const [deck] = useState(() => shuffle(visWords(s).filter((w) => s.learned.includes(w.id))));
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  if (!deck.length) return <><Header title="ಫ್ಲ್ಯಾಶ್ ಕಾರ್ಡ್" onBack={api.close} /><div className="pad"><p className="lead">ಮೊದಲು ಕೆಲವು ಪದ ಕಲಿಯಿರಿ 🌱</p></div></>;
  if (i >= deck.length) return <Done api={api} title="ಸಾಧು 🌿" line={`${deck.length} ಕಾರ್ಡ್‌ಗಳು ಮುಗಿದವು.`} />;
  const w = deck[i], f = FS[s.fontStep];
  const answer = (ok) => { api.grade([["w" + w.id, ok]]); setFlip(false); setI(i + 1); };
  return (
    <>
      <Header title="ಫ್ಲ್ಯಾಶ್ ಕಾರ್ಡ್" sub={`${i + 1} / ${deck.length}`} onBack={api.close} />
      <div className="pad">
        <Bar now={i + 1} total={deck.length} />
        <button type="button" className="card flash" onClick={() => setFlip(!flip)} aria-label="ಅರ್ಥ ನೋಡಲು ಒತ್ತಿ">
          {s.showDeva && <span className="dev" style={{ fontSize: 34 * f }}>{w.d}</span>}
          <span className="kan" style={{ fontSize: 30 * f }}>{w.k}</span>
          {flip ? <span className="mean big">{w.m}</span> : <span className="muted">ಅರ್ಥ ನೋಡಲು ಒತ್ತಿ</span>}
        </button>
        {flip && <div className="row two"><Btn kind="line" onClick={() => answer(false)}>ಮತ್ತೆ ನೋಡಬೇಕು</Btn><Btn onClick={() => answer(true)}>ಗೊತ್ತಿತ್ತು</Btn></div>}
      </div>
    </>
  );
}

function Search({ api }) {
  const { s } = api;
  const [q, setQ] = useState("");
  const t = q.trim().toLowerCase();
  const W = visWords(s), S = visSents(s), U = visSubh(s);
  const hw = t ? W.filter((w) => (w.k + " " + w.d + " " + w.m).toLowerCase().includes(t)).slice(0, 15) : [];
  const hs = t ? S.filter((x) => (x.k + " " + x.d + " " + x.m).toLowerCase().includes(t)).slice(0, 10) : [];
  const hu = t ? U.filter((v) => (v.lines.map((l) => l[0] + " " + l[1]).join(" ") + " " + v.m + " " + v.t).toLowerCase().includes(t)).slice(0, 5) : [];
  // new words introduced inside readings (not in the main word list)
  const hr = t ? visRead(s).flatMap((r) => r.words.filter((w) => (w[0] + " " + w[1] + " " + w[2]).toLowerCase().includes(t)).map((w) => ({ r, w }))).slice(0, 8) : [];
  return (
    <>
      <Header title="ಶಬ್ದಕೋಶ" sub="ಕನ್ನಡ ಅಥವಾ ಸಂಸ್ಕೃತ ಪದ ಬರೆಯಿರಿ" onBack={api.close} />
      <div className="pad">
        <input className="input" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="ಉದಾ: ನೀರು" aria-label="ಹುಡುಕಿ" />
        {t && !hw.length && !hs.length && !hu.length && !hr.length && <p className="muted">ಈ ಪದ ಇನ್ನೂ ಶಬ್ದಕೋಶದಲ್ಲಿ ಇಲ್ಲ. ಪಾಠಗಳು ಬೆಳೆದಂತೆ ಸೇರುತ್ತದೆ.</p>}
        {hw.map((w) => {
          const u = usageOf(w, S);
          return (
            <ScriptCard key={w.id} compact item={w} p={s} split={w.split} tag={`ಪದ #${pad3(w.id)}`} onReport={() => api.report("w", w.id, `ಪದ: ${w.d}`)}>
              {u && <div className="usage"><span className="muted small">ಉದಾಹರಣೆ</span>{s.showDeva && <span className="dev">{u.d}</span>}<span>{u.k}</span><span className="muted">{u.m}</span></div>}
            </ScriptCard>
          );
        })}
        {hs.length > 0 && <div className="sec-t">ವಾಕ್ಯಗಳು</div>}
        {hs.map((x) => <ScriptCard key={x.id} compact item={x} p={s} tag={`ವಾಕ್ಯ #${pad3(x.id)}`} onReport={() => api.report("s", x.id, `ವಾಕ್ಯ: ${x.d}`)} />)}
        {hr.length > 0 && <div className="sec-t">ವಾಚನದ ಪದಗಳು</div>}
        {hr.map(({ r, w }, i) => (
          <button type="button" key={i} className="card lvl" onClick={() => api.go({ kind: "reading", id: r.id })}>
            <span className="lvl-b"><b>{w[1]}{s.showDeva && <span className="dev muted"> {w[0]}</span>}</b><span className="muted">{w[2]} · ವಾಚನ: {r.t}</span></span>
          </button>
        ))}
        {hu.length > 0 && <div className="sec-t">ಸುಭಾಷಿತಗಳು</div>}
        {hu.map((v) => (
          <button type="button" key={v.id} className="card lvl" onClick={() => api.go({ kind: "subhashita", id: v.id })}>
            <span className="lvl-n">{v.id}</span>
            <span className="lvl-b"><b>{v.t}</b><span className="muted">{v.lines[0][1]} …</span></span>
          </button>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════ circle ═══════════════════ */
function Circle({ api, setTab }) {
  const { s } = api;
  const W = visWords(s), S = visSents(s), U = visSubh(s);
  const w = W.length ? W[dayNum() % W.length] : null, x = S.length ? S[dayNum() % S.length] : null, u = U.length ? U[dayNum() % U.length] : null;
  const lastBadge = BADGES.find((b) => b.id === s.badges[s.badges.length - 1]);
  const prompts = [
    ...(w ? [{ p: "ಇಂದು ಕಲಿತ ಪದವನ್ನು ಮಂಡಲದಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareWord(w, s) }] : []),
    ...(x ? [{ p: "ಇಂದಿನ ವಾಕ್ಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareSentence(x, s) }] : []),
    ...(u ? [{ p: "ಇಂದಿನ ಸುಭಾಷಿತವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareSubhashita(u, s) }] : []),
    { p: "ಇಂದು ಸಂಸ್ಕೃತವನ್ನು ಎಲ್ಲಿ ಬಳಸಿದಿರಿ? ಕನ್ನಡದಲ್ಲಿ ಬರೆದು ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareFree("ಇಂದು ನಾನು ಸಂಸ್ಕೃತವನ್ನು ಬಳಸಿದ್ದು:", s) },
    { p: "ಯಾವ ಪದ ಕಷ್ಟವಾಯಿತು? ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ.", t: () => shareFree("ನನಗೆ ಕಷ್ಟವಾದ ಪದ / ನನ್ನ ಪ್ರಶ್ನೆ:", s) },
    ...(lastBadge ? [{ p: "ನಿಮ್ಮ ಸಾಧನೆಯ ಬ್ಯಾಡ್ಜ್ ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareBadge(lastBadge, s) }] : []),
  ];
  const pr = prompts[dayNum() % prompts.length];
  return (
    <>
      <Header title="ಸಂಸ್ಕೃತಮಂಡಲಮ್" sub="ನಾವು ಕಲಿತದ್ದನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಜಾಗ" />
      <div className="pad">
        <WeekBoard api={api} setTab={setTab} />
        <div className="card"><div className="sec-t">ಇಂದಿನ ಹಂಚಿಕೆ</div><p>{pr.p}</p><Btn wide onClick={() => api.share(pr.t())}>ಸಂದೇಶ ಸಿದ್ಧಪಡಿಸಿ</Btn></div>
        <div className="card"><div className="sec-t">ವಾಟ್ಸಾಪ್ ಮಂಡಲ</div><p>ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲದ ಗುಂಪಿಗೆ ಸೇರಿ. ಅಲ್ಲಿ ಎಲ್ಲರೂ ತಾವು ಕಲಿತದ್ದನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ.</p>
          <a className="btn btn-line wide" href={WA_GROUP} target="_blank" rel="noopener">ಗುಂಪಿಗೆ ಸೇರಿ</a></div>
        <div className="card"><div className="sec-t">ಮಂಡಲದ ನಿಯಮ</div><p><b>ಸಂಸ್ಕೃತ ಸಂಬಂಧಿತ ವಿಷಯ ಮಾತ್ರ.</b></p>
          <p className="small">✓ ನಿಮ್ಮ ಕಲಿಕೆ, ನಿಮ್ಮ ಪ್ರಶ್ನೆ, ಸುಭಾಷಿತ, ಸಂಸ್ಕೃತ ಪುಸ್ತಕದ ಸಲಹೆ</p>
          <p className="small">✗ ಶುಭೋದಯ ಸಂದೇಶ, ರಾಜಕೀಯ, ಜಾಹೀರಾತು, ಅಸಂಬಂಧಿತ ಫಾರ್ವರ್ಡ್</p></div>
        <div className="card"><div className="sec-t">ಒಬ್ಬ ಮಿತ್ರನನ್ನು ಕರೆತನ್ನಿ</div><p>ಒಬ್ಬರಿಗೆ ಕಳಿಸಿದರೆ ಸಾಕು. ನಿಧಾನವಾಗಿ ಬೆಳೆಯಲಿ.</p>
          <Btn wide kind="line" onClick={() => api.share(inviteText(s))}>ಆಹ್ವಾನ ಸಿದ್ಧಪಡಿಸಿ</Btn></div>
        {s.shares > 0 && <p className="muted center small">ನೀವು ಮಂಡಲದಲ್ಲಿ {s.shares} ಬಾರಿ ಹಂಚಿಕೊಂಡಿದ್ದೀರಿ. ಇದು ನಿಮಗೆ ಮಾತ್ರ ಕಾಣುತ್ತದೆ.</p>}
      </div>
    </>
  );
}

/* ═══════════════════ weekly board ═══════════════════ */
const MEDAL = ["🥇", "🥈", "🥉"];
function WeekBoard({ api, setTab }) {
  const { s, cloud } = api;
  const wk = weekNum();
  const [which, setWhich] = useState("cur");
  const [b, setB] = useState(null);
  const [off, setOff] = useState(false);
  const signedIn = !!cloud.auth;

  useEffect(() => {
    if (!cloud.cfg?.enabled) return;
    let live = true;
    setOff(false);
    fetchBoard(getAuth()?.token, which === "cur" ? wk : wk - 1)
      .then((r) => live && setB(r), () => live && setOff(true));
    return () => { live = false; };
  }, [which, signedIn, cloud.cfg?.enabled]);

  if (!cloud.cfg?.enabled) return null;
  // my score from this phone's own log — shows at once, even offline
  const mine = weekScore(weekDayKeys(wk).map((d) => s.log?.[d]).filter(Boolean), s.challengeTicks[wk]);
  const shown = b && b.week === (which === "cur" ? wk : wk - 1) ? b : null;
  // this phone's count shows at once; the server's (all devices) wins when it is higher
  const srv = shown?.me || null;
  const showMine = which === "cur"
    ? (srv && srv.pts > mine.pts ? srv : mine)
    : srv;

  return (
    <div className="card">
      <div className="sec-t">ಮಂಡಲದ ವಾರದ ಸಾಧಕರು</div>
      <div className="seg">
        {[["cur", "ಈ ವಾರ"], ["prev", "ಕಳೆದ ವಾರ"]].map(([k, l]) => (
          <button type="button" key={k} className={which === k ? "on" : ""} aria-pressed={which === k} onClick={() => setWhich(k)}>{l}</button>))}
      </div>

      {showMine && (
        <div className="wb-me">
          <div><b>{showMine.pts}</b> / {WEEK_MAX} <span className="muted small">ನಿಮ್ಮ ಸಾಧನಾ ಅಂಕ</span></div>
          <div className="bprog" aria-hidden="true"><i style={{ width: `${Math.min(100, (100 * showMine.pts) / WEEK_MAX)}%` }} /></div>
          <div className="muted small">ಕಲಿತ ದಿನ {showMine.days}/7{signedIn && shown?.me?.rank ? ` · ಸ್ಥಾನ ${shown.me.rank} (${shown.learners} ಕಲಿಯುವವರಲ್ಲಿ)` : ""}</div>
        </div>
      )}
      {!signedIn && (
        <p className="small">ನಿಮ್ಮ ಅಂಕ ಮಂಡಲದ ಪಟ್ಟಿಗೆ ಸೇರಲು Google ಖಾತೆಯಿಂದ ಲಾಗಿನ್ ಆಗಿ.{" "}
          <button type="button" className="link" onClick={() => { setTab("me"); window.scrollTo(0, 0); }}>ಲಾಗಿನ್ →</button></p>
      )}
      {signedIn && shown?.me && !shown.me.board && (
        <p className="muted small">ನಿಮ್ಮ ಹೆಸರು ಪಟ್ಟಿಯಲ್ಲಿ ಕಾಣಬೇಕಾದರೆ "ನಾನು" ಪರದೆಯ ಕ್ಲೌಡ್ ಉಳಿಕೆಯಲ್ಲಿ ಒಪ್ಪಿಗೆಯ ಗುರುತು ಹಾಕಿ.</p>
      )}

      {off ? <p className="muted small">ಇಂಟರ್ನೆಟ್ ಬಂದಾಗ ಪಟ್ಟಿ ಕಾಣುತ್ತದೆ.</p>
        : !shown ? <p className="muted small">ಪಟ್ಟಿ ತರಲಾಗುತ್ತಿದೆ…</p>
        : !shown.top.length ? <p className="muted small">{which === "cur" ? "ಈ ವಾರದ ಪಟ್ಟಿ ಇನ್ನೂ ಖಾಲಿ." : "ಕಳೆದ ವಾರದ ಪಟ್ಟಿ ಖಾಲಿ."}</p>
        : (<>
          <ol className="wb-list">
            {shown.top.map((r, i) => (
              <li key={i} className={r.me ? "me" : ""}>
                <span className="wb-r">{MEDAL[i] || i + 1}</span>
                <span className="wb-n">{r.name}{r.me ? " (ನೀವು)" : ""}</span>
                <span className="wb-p"><b>{r.pts}</b> <span className="muted small">· {r.days}/7</span></span>
              </li>
            ))}
          </ol>
          {shown.perfect.length > 0 && <p className="small"><b>ಸತತ 7 ದಿನ 🌿</b><br />{shown.perfect.join(", ")}</p>}
        </>)}

      <details className="wb-how">
        <summary className="small">ಅಂಕ ಹೇಗೆ ಸಿಗುತ್ತದೆ?</summary>
        <ul className="small">
          <li>ಕಲಿತ ಪ್ರತಿ ದಿನ: 10</li>
          <li>ಇಂದಿನ ಯೋಜನೆ ಪೂರ್ಣ: 5</li>
          <li>ಪ್ರತಿ ಹೊಸ ಪದ, ವಾಕ್ಯ ಅಥವಾ ಪಾಠ: 1 (ದಿನಕ್ಕೆ ಗರಿಷ್ಠ 10)</li>
          <li>ವಾರದ ಸವಾಲಿನ ಪ್ರತಿ ಹೆಜ್ಜೆ: 5, ಮೂರೂ ಮುಗಿದರೆ ಇನ್ನೂ 10</li>
        </ul>
        <p className="muted small">ವಾರಕ್ಕೆ ಗರಿಷ್ಠ {WEEK_MAX}. ವಾರ ಸೋಮವಾರದಿಂದ ಭಾನುವಾರ. ದಿನವೂ ಸ್ವಲ್ಪ ಕಲಿಯುವುದೇ ಮುಖ್ಯ.</p>
      </details>
    </div>
  );
}

/* ═══════════════════ me ═══════════════════ */
function Me({ api, setTab }) {
  const { s, update, flash } = api;
  const earn = (b) => { if (b.go.tab) setTab(b.go.tab); else api.go(b.go); window.scrollTo(0, 0); };
  const [name, setName] = useState(s.name);
  const [code, setCode] = useState("");
  const [remT, setRemT] = useState("07:00");
  const copy = (t, msg) => (navigator.clipboard?.writeText(t) || Promise.reject()).then(() => flash(msg), () => flash("ನಕಲಿಸಲು ಆಗಲಿಲ್ಲ. ಕೈಯಾರೆ ಆರಿಸಿ ನಕಲಿಸಿ."));
  const reps = activeReports(s);
  const reportText = reps.length
    ? `ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್ — ತಪ್ಪಿನ ವರದಿ (${s.name})\n\n` + reps.map((r, i) => `${i + 1}. ${r.label}${r.note ? ` — ${r.note}` : ""} (${r.on})`).join("\n")
    : "";
  const restore = (r) => update((st) => ({ ...st, reports: st.reports.map((x) => (x.kind === r.kind && x.id === r.id ? { ...x, off: Date.now() } : x)) }));
  const doImport = () => { try { const d = importCode(code); setCode(""); api.openImport(d); } catch { flash("ಈ ಕೋಡ್ ಸರಿಯಿಲ್ಲ."); } };
  return (
    <>
      <Header title="ನಿಮ್ಮ ಪ್ರಯಾಣ" />
      <div className="pad">
        <div className="card stats">
          {[[s.learned.length, "ಕಲಿತ ಪದಗಳು"], [s.sentences.length, "ಕಲಿತ ವಾಕ್ಯಗಳು"], [s.dialogues.length, "ಸಂಭಾಷಣೆಗಳು"], [`🔥 ${s.streak}`, "ಸರಣಿ"], [`⭐ ${s.xp}`, "ಅಂಕ"]]
            .map(([v, l]) => <div key={l} className="stat"><b>{v}</b><span>{l}</span></div>)}
        </div>
        <div className="card stats">
          {[[s.grammar.length, "ವ್ಯಾಕರಣ ಪಾಠಗಳು"], [s.subhashitas.length, "ಸುಭಾಷಿತಗಳು"], [s.readings.length, "ವಾಚನಗಳು"], [s.badges.length, "ಸಾಧನೆಗಳು"]]
            .map(([v, l]) => <div key={l} className="stat"><b>{v}</b><span>{l}</span></div>)}
        </div>

        <div className="sec-t">ಸಾಧನೆಗಳು <span className="muted">— {s.badges.length} / {BADGES.length}</span></div>
        <p className="muted small">ಪಡೆದ ಸಾಧನೆ ಒತ್ತಿದರೆ ಹಂಚಿಕೊಳ್ಳಬಹುದು. ಬಾಕಿ ಇರುವುದನ್ನು ಒತ್ತಿದರೆ ಅದನ್ನು ಪಡೆಯುವ ಪಾಠಕ್ಕೆ ಹೋಗುತ್ತದೆ.</p>
        <div className="badges">
          {BADGES.map((b) => {
            const on = s.badges.includes(b.id);
            if (on) return (
              <button type="button" key={b.id} className="badge on" onClick={() => api.share(shareBadge(b, s))}>
                <b>🏅 {b.t}</b><span>{b.d}</span></button>
            );
            const [done, need] = b.p(s);
            const now = Math.min(done, need), pct = Math.round((100 * now) / need);
            return (
              <button type="button" key={b.id} className="badge todo" onClick={() => earn(b)}
                aria-label={`${b.t} — ${b.d}. ${now} / ${need}. ${b.h}`}>
                <b>○ {b.t}</b><span>{b.d}</span>
                <span className="bprog" aria-hidden="true"><i style={{ width: `${pct}%` }} /></span>
                <span className="bhint">{now} / {need} · {b.h} →</span>
              </button>
            );
          })}
        </div>

        <div className="sec-t">ಪ್ರದರ್ಶನ</div>
        <div className="card">
          <label className="switch"><input type="checkbox" checked={s.showDeva} onChange={() => update({ showDeva: !s.showDeva })} /> ದೇವನಾಗರಿ ತೋರಿಸು</label>
          <p className="muted small">ಕನ್ನಡ ಲಿಪಿ ಸದಾ ಕಾಣುತ್ತದೆ.</p>
          <label className="switch"><input type="checkbox" checked={!!s.contrast} onChange={() => update({ contrast: !s.contrast })} /> ಹೆಚ್ಚು ಸ್ಪಷ್ಟ ಬಣ್ಣಗಳು (ಹೈ-ಕಾಂಟ್ರಾಸ್ಟ್)</label>
          <div className="muted small" style={{ marginTop: 12 }}>ಅಕ್ಷರದ ಗಾತ್ರ</div>
          <div className="seg">{["ಸಣ್ಣ", "ಮಧ್ಯಮ", "ದೊಡ್ಡ"].map((l, i) => (
            <button type="button" key={i} className={s.fontStep === i ? "on" : ""} aria-pressed={s.fontStep === i} onClick={() => update({ fontStep: i })}>{l}</button>))}</div>
          <div className="muted small" style={{ marginTop: 12 }}>ನಿಮ್ಮ ಹೆಸರು</div>
          <div className="row"><input className="input" value={name} onChange={(e) => setName(e.target.value)} aria-label="ನಿಮ್ಮ ಹೆಸರು" />
            <Btn small disabled={!name.trim() || name.trim() === s.name} onClick={() => { update({ name: name.trim() }); if (api.cloud.auth) api.cloudApi.profile({ name: name.trim() }); flash("ಹೆಸರು ಉಳಿಸಲಾಗಿದೆ"); }}>ಉಳಿಸಿ</Btn></div>
        </div>

        <div className="sec-t">ದಿನನಿತ್ಯದ ನೆನಪು</div>
        <div className="card">
          <p className="small">ಆ್ಯಪ್ ಇನ್ನೂ ತಾನಾಗಿ ನೆನಪಿಸುವುದಿಲ್ಲ. ಫೋನಿನ ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ದಿನನಿತ್ಯದ ನೆನಪು ಸೇರಿಸಿ, ಅಥವಾ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ನಿಮಗೇ ಒಂದು ಸಂದೇಶ ಕಳಿಸಿ ಪಿನ್ ಮಾಡಿಕೊಳ್ಳಿ.</p>
          <div className="row"><label className="muted small" htmlFor="remT">ಸಮಯ</label><input id="remT" type="time" className="input" value={remT} onChange={(e) => setRemT(e.target.value)} /></div>
          <div className="row two">
            <a className="btn btn-solid small" href={reminderIcs(remT)} download="sanskrit-daily.ics">ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ</a>
            <a className="btn btn-line small" href={reminderWa()} target="_blank" rel="noopener">ವಾಟ್ಸಾಪ್ ನೆನಪು</a>
          </div>
        </div>

        <div className="sec-t">ವರದಿಯಾದ ತಪ್ಪುಗಳು</div>
        <div className="card">
          {!reps.length ? <p className="muted">ಯಾವುದೇ ವರದಿ ಇಲ್ಲ.</p> : (<>
            <p className="small">{reps.length} ವರದಿ. ವರದಿಯಾದ ವಸ್ತು ನಿಮ್ಮ ಪಾಠಗಳಿಂದ ಮರೆಯಾಗಿದೆ. ಈ ಪಟ್ಟಿಯನ್ನು ಕಲ್ಪತರು ತಂಡಕ್ಕೆ ಕಳಿಸಿ.</p>
            {reps.map((r, i) => (
              <div key={i} className="rep"><span>{r.label}{r.note ? <em> — {r.note}</em> : null}</span>
                <button type="button" className="link" onClick={() => restore(r)}>ಮರಳಿ ತೋರಿಸು</button></div>
            ))}
            <div className="row two">
              <Btn small kind="line" onClick={() => copy(reportText, "ವರದಿ ಪಟ್ಟಿ ನಕಲಾಗಿದೆ")}>ಪಟ್ಟಿ ನಕಲಿಸಿ</Btn>
              <a className="btn btn-line small" href={`https://wa.me/?text=${encodeURIComponent(reportText)}`} target="_blank" rel="noopener">ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಳಿಸಿ</a>
            </div>
          </>)}
        </div>

        <CloudCard api={api} />

        <div className="sec-t">ಪ್ರಗತಿಯ ಬ್ಯಾಕಪ್</div>
        <div className="card">
          <p className="small">{api.cloud.auth
            ? "ನಿಮ್ಮ ಪ್ರಗತಿ ಈಗಾಗಲೇ Google ಖಾತೆಯಲ್ಲಿ ಉಳಿಯುತ್ತಿದೆ. ಬೇಕಿದ್ದರೆ ಈ ಲಿಂಕ್ ಅನ್ನೂ ಹೆಚ್ಚುವರಿ ಬ್ಯಾಕಪ್ ಆಗಿ ಇಟ್ಟುಕೊಳ್ಳಬಹುದು."
            : "ಲಾಗಿನ್ ಆಗದಿದ್ದರೆ ನಿಮ್ಮ ಪ್ರಗತಿ ಈ ಫೋನಿನ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಉಳಿಯುತ್ತದೆ. ಫೋನ್ ಬದಲಿಸುವ ಮೊದಲು ಅಥವಾ ಬ್ರೌಸರ್ ಡೇಟಾ ಅಳಿಸುವ ಮೊದಲು ಈ ಲಿಂಕ್ ಅನ್ನು ನಿಮಗೇ ಕಳಿಸಿಕೊಳ್ಳಿ. ಅದನ್ನು ಒತ್ತಿದರೆ ಪ್ರಗತಿ ಮರಳಿ ಬರುತ್ತದೆ."}</p>
          <div className="row two">
            <Btn small kind="line" onClick={() => copy(transferLink(s), "ವರ್ಗಾವಣೆ ಲಿಂಕ್ ನಕಲಾಗಿದೆ")}>ಲಿಂಕ್ ನಕಲಿಸಿ</Btn>
            <a className="btn btn-line small" href={`https://wa.me/?text=${encodeURIComponent("ನನ್ನ ಸಂಸ್ಕೃತ ಮಂಡಲದ ಪ್ರಗತಿ:\n" + transferLink(s))}`} target="_blank" rel="noopener">ವಾಟ್ಸಾಪ್‌ಗೆ ಕಳಿಸಿ</a>
          </div>
          <div className="muted small" style={{ marginTop: 12 }}>ಲಿಂಕ್ ಅಥವಾ ಕೋಡ್ ಇದ್ದರೆ ಇಲ್ಲಿ ಅಂಟಿಸಿ</div>
          <div className="row"><input className="input" value={code} onChange={(e) => setCode(e.target.value)} aria-label="ವರ್ಗಾವಣೆ ಕೋಡ್" />
            <Btn small disabled={!code.trim()} onClick={doImport}>ಮರಳಿ ತನ್ನಿ</Btn></div>
        </div>

        <div className="card honest"><p>ಈ ಆ್ಯಪ್‌ನ ಪಾಠಗಳು ಪ್ರಾಥಮಿಕ ಸಂಸ್ಕೃತ ಪಠ್ಯಗಳಿಂದ ತೆಗೆದುಕೊಂಡವು, ಇನ್ನೂ ವಿದ್ವಾಂಸರ ಪರಿಶೀಲನೆ ಆಗಿಲ್ಲ. ಇಲ್ಲಿ ನಾವೆಲ್ಲರೂ ಕಲಿಯುವವರೇ. ತಪ್ಪು ಕಂಡರೆ ತಿಳಿಸಿ 🙏</p></div>
        <p className="muted center small">ಆವೃತ್ತಿ {VERSION}</p>
      </div>
    </>
  );
}

/* ═══════════════════ cloud save (Google) ═══════════════════ */
function CloudCard({ api }) {
  const { cloud, cloudApi, flash } = api;
  const btnRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [board, setBoard] = useState(false);
  const [busy, setBusy] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const cfg = cloud.cfg;
  const u = cloud.user;

  useEffect(() => {
    if (!cfg?.enabled || cloud.auth || !btnRef.current) return;
    let live = true;
    loadGsi().then((g) => {
      if (!live || !btnRef.current) return;
      g.accounts.id.initialize({ client_id: cfg.googleClientId, callback: (r) => cloudApi.login(r.credential) });
      g.accounts.id.renderButton(btnRef.current, { theme: "outline", size: "large", shape: "pill", text: "signin_with", locale: "kn" });
    }, () => flash("Google ಲಾಗಿನ್ ತೆರೆಯಲು ಆಗಲಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ."));
    return () => { live = false; };
  }, [cfg?.enabled, cloud.auth]);

  useEffect(() => { if (u) setBoard(u.board); }, [u?.board]);

  if (!cfg?.enabled) return null;

  const savePhone = async () => {
    setBusy(true);
    const ok = await cloudApi.profile({ phone, consent: true, board });
    setBusy(false);
    if (ok) { setEditPhone(false); setPhone(""); flash("ಉಳಿಸಲಾಗಿದೆ 🙏"); }
  };
  const toggleBoard = async () => { const v = !board; setBoard(v); if (!(await cloudApi.profile({ board: v }))) setBoard(!v); };
  const when = cloud.at ? new Date(cloud.at).toLocaleTimeString("kn-IN", { hour: "2-digit", minute: "2-digit" }) : null;
  const status = cloud.status === "saving" ? "ಉಳಿಸಲಾಗುತ್ತಿದೆ…"
    : cloud.status === "error" ? "ಈಗ ಉಳಿಸಲು ಆಗಲಿಲ್ಲ. ಇಂಟರ್ನೆಟ್ ಬಂದಾಗ ತಾನಾಗಿ ಉಳಿಯುತ್ತದೆ."
    : when ? `ಪ್ರಗತಿ ಉಳಿಸಲಾಗಿದೆ ☁️ (${when})` : "ಪ್ರಗತಿ ತಾನಾಗಿ ಉಳಿಯುತ್ತದೆ ☁️";

  return (<>
    <div className="sec-t">ಕ್ಲೌಡ್ ಉಳಿಕೆ</div>
    <div className="card">
      {!cloud.auth ? (<>
        <p className="small">Google ಖಾತೆಯಿಂದ ಒಮ್ಮೆ ಲಾಗಿನ್ ಆದರೆ ನಿಮ್ಮ ಪ್ರಗತಿ ಸುರಕ್ಷಿತವಾಗಿ ಉಳಿಯುತ್ತದೆ. ಹೊಸ ಫೋನಿನಲ್ಲಿ ಅದೇ ಖಾತೆಯಿಂದ ಲಾಗಿನ್ ಆದರೆ ಪ್ರಗತಿ ಮರಳಿ ಬರುತ್ತದೆ.</p>
        <div ref={btnRef} className="gbtn" />
        <p className="muted small">ವಾಟ್ಸಾಪ್ ಒಳಗಿನ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಲಾಗಿನ್ ಆಗದಿದ್ದರೆ, ಈ ಪುಟವನ್ನು Chrome ಅಥವಾ Safari‌ನಲ್ಲಿ ತೆರೆಯಿರಿ.</p>
      </>) : (<>
        <p className="small"><b>{u?.email || "Google ಖಾತೆ"}</b><br />{status}</p>
        {u && (!u.phone || editPhone) ? (<>
          <div className="muted small" style={{ marginTop: 8 }}>ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ</div>
          <div className="row"><input className="input" type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxxxxxxx"
            value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" /></div>
          <label className="switch"><input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} /> ನನ್ನ ಸಂಖ್ಯೆಯನ್ನು ಕಲ್ಪತರು ತಂಡ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ಮಾತ್ರ ಬಳಸಬಹುದು.</label>
          <label className="switch"><input type="checkbox" checked={board} onChange={() => setBoard(!board)} /> ಮಂಡಲದ ವಾರದ ಸಾಧಕರ ಪಟ್ಟಿಯಲ್ಲಿ ನನ್ನ ಹೆಸರು ತೋರಿಸಬಹುದು.</label>
          <div className="row two">
            {editPhone && <Btn small kind="line" onClick={() => setEditPhone(false)}>ಬೇಡ</Btn>}
            <Btn small disabled={busy || !consent || phone.replace(/\D/g, "").length < 10} onClick={savePhone}>ಉಳಿಸಿ</Btn>
          </div>
        </>) : u ? (<>
          <p className="small">📱 {u.phone} <button type="button" className="link" onClick={() => setEditPhone(true)}>ಬದಲಿಸಿ</button>
            <button type="button" className="link" onClick={async () => { if (await cloudApi.profile({ phone: "" })) flash("ಸಂಖ್ಯೆ ತೆಗೆಯಲಾಗಿದೆ"); }}>ತೆಗೆಯಿರಿ</button></p>
          <label className="switch"><input type="checkbox" checked={board} onChange={toggleBoard} /> ಮಂಡಲದ ವಾರದ ಸಾಧಕರ ಪಟ್ಟಿಯಲ್ಲಿ ನನ್ನ ಹೆಸರು ತೋರಿಸಬಹುದು.</label>
        </>) : null}
        <div className="row two" style={{ marginTop: 8 }}>
          <Btn small kind="line" disabled={cloud.status === "saving"} onClick={cloudApi.syncNow}>ಈಗ ಉಳಿಸಿ</Btn>
          <Btn small kind="line" onClick={cloudApi.logout}>ಲಾಗ್ ಔಟ್</Btn>
        </div>
      </>)}
    </div>
  </>);
}

/* ═══════════════════ sheets ═══════════════════ */
function Sheet({ children, close, label }) {
  useEffect(() => { const k = (e) => e.key === "Escape" && close(); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  return (
    <div className="veil" onClick={close}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function ShareSheet({ text, close, onShared, flash }) {
  const [t, setT] = useState(text);
  const copy = () => (navigator.clipboard?.writeText(t) || Promise.reject()).then(() => { flash("ನಕಲಾಗಿದೆ. ಗುಂಪಿನಲ್ಲಿ ಅಂಟಿಸಿ 🌿"); onShared(); close(); }, () => flash("ನಕಲಿಸಲು ಆಗಲಿಲ್ಲ. ಕೈಯಾರೆ ಆರಿಸಿ ನಕಲಿಸಿ."));
  return (
    <Sheet close={close} label="ಮಂಡಲದಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ">
      <div className="sheet-t">ಮಂಡಲದಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ</div>
      <p className="muted small">ಕಳಿಸುವ ಮೊದಲು ಬೇಕಾದರೆ ತಿದ್ದಬಹುದು. ಆ್ಯಪ್ ತಾನಾಗಿ ಏನನ್ನೂ ಕಳಿಸುವುದಿಲ್ಲ — ನೀವೇ ಕಳಿಸಬೇಕು.</p>
      <textarea className="input share-box" value={t} onChange={(e) => setT(e.target.value)} rows={9} aria-label="ಸಂದೇಶ" />
      <div className="row two">
        <Btn kind="line" onClick={copy}>ನಕಲಿಸಿ</Btn>
        <a className="btn btn-solid" href={`https://wa.me/?text=${encodeURIComponent(t)}`} target="_blank" rel="noopener" onClick={() => { onShared(); close(); }}>ವಾಟ್ಸಾಪ್</a>
      </div>
      <Btn wide kind="ghost" onClick={close}>ಬೇಡ</Btn>
    </Sheet>
  );
}

function ReportSheet({ r, close, api }) {
  const [note, setNote] = useState("");
  const send = () => {
    api.update((st) => ({ ...st, reports: [...st.reports.filter((x) => !(x.kind === r.kind && x.id === r.id)), { ...r, note: note.trim() || undefined, on: new Date().toISOString().slice(0, 10), at: Date.now() }] }));
    close();
    if ("durg".includes(r.kind)) api.close(); // full-screen item just got hidden — leave it
    api.flash("ತಿಳಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದ. ಪರಿಶೀಲಿಸುತ್ತೇವೆ 🙏");
  };
  return (
    <Sheet close={close} label="ತಪ್ಪು ತಿಳಿಸಿ">
      <div className="sheet-t">ತಪ್ಪು ತಿಳಿಸಿ</div>
      <p className="dev-or">{r.label}</p>
      <p className="small">ವರದಿ ಮಾಡಿದರೆ ಇದು ನಿಮ್ಮ ಪಾಠಗಳಿಂದ ಮರೆಯಾಗುತ್ತದೆ. "ನಾನು" ಟ್ಯಾಬ್‌ನಿಂದ ಮರಳಿ ತರಬಹುದು.</p>
      <textarea className="input" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="ಏನು ತಪ್ಪು? (ಬರೆಯದಿದ್ದರೂ ಸರಿ)" aria-label="ಟಿಪ್ಪಣಿ" />
      <div className="row two"><Btn kind="line" onClick={close}>ಬೇಡ</Btn><Btn onClick={send}>ವರದಿ ಮಾಡಿ</Btn></div>
    </Sheet>
  );
}

function ImportSheet({ api, data, close }) {
  const doIt = () => { api.update((st) => mergeState(st, data), { nolog: true }); close(); api.flash("ಪ್ರಗತಿ ಮರಳಿ ಬಂದಿದೆ 🌿"); };
  return (
    <Sheet close={close} label="ಪ್ರಗತಿ ಮರಳಿ ತನ್ನಿ">
      <div className="sheet-t">ಹಳೆಯ ಪ್ರಗತಿ ಸಿಕ್ಕಿದೆ</div>
      <p>{data.name ? `${data.name} — ` : ""}📚 {data.learned.length} ಪದ · 💬 {data.sentences.length} ವಾಕ್ಯ · 🔥 {data.streak} ದಿನ</p>
      <p className="small">ಇದನ್ನು ಈ ಫೋನಿನ ಪ್ರಗತಿಯೊಂದಿಗೆ ಸೇರಿಸಲೇ? ಈಗಿರುವ ಪ್ರಗತಿ ಅಳಿಯುವುದಿಲ್ಲ.</p>
      <div className="row two"><Btn kind="line" onClick={close}>ಬೇಡ</Btn><Btn onClick={doIt}>ಸೇರಿಸಿ</Btn></div>
    </Sheet>
  );
}

/* ═══════════════════ nav ═══════════════════ */
function Nav({ tab, setTab }) {
  const items = [["home", "🏠", "ಮನೆ"], ["learn", "📚", "ಕಲಿ"], ["practice", "🔁", "ಅಭ್ಯಾಸ"], ["circle", "🌿", "ಮಂಡಲ"], ["me", "👤", "ನಾನು"]];
  return (
    <nav className="nav" aria-label="ಮುಖ್ಯ ಮೆನು">
      {items.map(([k, ic, l]) => (
        <button type="button" key={k} className={tab === k ? "on" : ""} aria-current={tab === k ? "page" : undefined}
          onClick={() => { setTab(k); window.scrollTo(0, 0); }}><span aria-hidden="true">{ic}</span>{l}</button>
      ))}
    </nav>
  );
}

const VIEWS = {
  l0: Level0, l1: Level1, lesson: Lesson, l2: Level2, squiz: SentenceQuiz, l3: Level3, dialogue: Dialogue,
  l4: Level4, grammar: GrammarLesson, gquiz: GrammarQuiz, l5: Level5, subhashita: Subhashita, uquiz: SubhashitaQuiz, l6: Level6, reading: Reading,
  review: Review, flash: Flash, search: Search,
};
