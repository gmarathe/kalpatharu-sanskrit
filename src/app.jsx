import React, { useState, useEffect, useMemo, useRef } from "react";
import { VOWELS, CONSONANTS, NOTES, MODULES, WORDS, SENTENCES, DIALOGUES } from "./content.js";
import {
  EMPTY, load, save, migrate, dayNum, weekNum, pad3, pick, shuffle,
  visWords, visSents, visDias, gradeItem, wordState, isDue, touch, usageOf,
  challengeOfWeek, shareWord, shareSentence, shareLesson, shareBadge, shareChallenge, shareFree,
  inviteText, exportCode, importCode, transferLink, WA_GROUP, APP_URL,
} from "./lib.js";
import {
  Btn, Header, Bar, ScriptCard, Parts, SrcLine, Quiz, FS,
  wordQ, matchQ, sentQ, distinct, nextLineQ, letterQ, alignable,
} from "./ui.jsx";

const VERSION = "2.0";

/* ── badges ─────────────────────────────────────────────── */
const BADGES = [
  { id: "b1", t: "ಪ್ರಥಮಪದಮ್", d: "ಮೊದಲ ಸಂಸ್ಕೃತ ಪದ", g: (s) => s.learned.length >= 1 },
  { id: "b2", t: "ದಶಪದಾನಿ", d: "10 ಪದಗಳು", g: (s) => s.learned.length >= 10 },
  { id: "b3", t: "ಪಞ್ಚಾಶತ್", d: "50 ಪದಗಳು", g: (s) => s.learned.length >= 50 },
  { id: "b4", t: "ಶತಪದಾನಿ", d: "100 ಪದಗಳು", g: (s) => s.learned.length >= 100 },
  { id: "b5", t: "ಪ್ರಥಮವಾಕ್ಯಮ್", d: "ಮೊದಲ ವಾಕ್ಯ", g: (s) => s.sentences.length >= 1 },
  { id: "b6", t: "ಪ್ರಥಮಸಂವಾದಃ", d: "ಮೊದಲ ಸಂಭಾಷಣೆ", g: (s) => s.dialogues.length >= 1 },
  { id: "b7", t: "ಸಪ್ತದಿನಸಾಧನಾ", d: "7 ದಿನಗಳ ಸರಣಿ", g: (s) => s.streak >= 7 },
  { id: "b8", t: "ತ್ರಿಂಶದ್ದಿನಸಾಧನಾ", d: "30 ದಿನಗಳ ಸರಣಿ", g: (s) => s.streak >= 30 },
  { id: "b9", t: "ಪ್ರಥಮಸವಾಲು", d: "ಮೊದಲ ಸಪ್ತಾಹದ ಸವಾಲು", g: (s) => Object.values(s.challengeTicks).some((t) => t && t.every(Boolean)) },
];

/* ═══════════════════ root ═══════════════════ */
export default function App() {
  const [s, setS] = useState(null);
  const [tab, setTab] = useState("home");
  const [view, setView] = useState(null);     // full-screen sub view
  const [sheet, setSheet] = useState(null);   // { kind:"share"|"report"|"import", ... }
  const [toast, setToast] = useState(null);
  const toastT = useRef();

  useEffect(() => {
    const checkHash = () => {
      const m = location.hash.match(/#import=(.+)$/);
      if (!m) return;
      try { setSheet({ kind: "import", data: importCode(m[1]) }); } catch { flash("ಈ ವರ್ಗಾವಣೆ ಲಿಂಕ್ ಸರಿಯಿಲ್ಲ."); }
      history.replaceState(null, "", location.pathname);
    };
    load().then((st) => { setS(st); checkHash(); });
    addEventListener("hashchange", checkHash);
    return () => removeEventListener("hashchange", checkHash);
  }, []);
  useEffect(() => { if (s) document.documentElement.classList.toggle("hc", !!s.contrast); }, [s?.contrast]);

  function flash(msg, action) {
    clearTimeout(toastT.current);
    setToast({ msg, action });
    toastT.current = setTimeout(() => setToast(null), action ? 6000 : 2600);
  }

  // every state change: apply, award badges, persist
  const update = (fn) => setS((prev) => {
    let n = typeof fn === "function" ? fn(prev) : { ...prev, ...fn };
    const fresh = BADGES.filter((b) => b.g(n) && !n.badges.includes(b.id));
    if (fresh.length) {
      n = { ...n, badges: [...n.badges, ...fresh.map((b) => b.id)] };
      const b = fresh[fresh.length - 1];
      setTimeout(() => flash(`🏅 ಹೊಸ ಸಾಧನೆ: ${b.t}`, { label: "ಹಂಚಿಕೊಳ್ಳಿ", run: () => setSheet({ kind: "share", text: shareBadge(b, n) }) }), 50);
    }
    save(n);
    return n;
  });

  if (!s) return <div className="ks"><div className="loading">ಸಿದ್ಧವಾಗುತ್ತಿದೆ…</div></div>;

  const api = {
    s, update, flash,
    go: setView, close: () => setView(null),
    share: (text) => setSheet({ kind: "share", text }),
    report: (kind, id, label) => setSheet({ kind: "report", r: { kind, id, label } }),
    grade: (grades) => update((st) => touch(grades.reduce((acc, [k, ok]) => gradeItem(acc, k, ok), st))),
    openImport: (data) => setSheet({ kind: "import", data }),
    learnWord: (id) => update((st) => touch(st.learned.includes(id) ? st : { ...st, learned: [...st.learned, id], xp: st.xp + 5 })),
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
          : tab === "circle" ? <Circle api={api} />
          : <Me api={api} />}
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
        <p className="muted">ನೀವೇ ಹಂಚಿಕೊಳ್ಳುವ ಸಂದೇಶಗಳ ಕೆಳಗೆ ಮಾತ್ರ ಈ ಹೆಸರು ಬರುತ್ತದೆ. ಬೇರೆ ಎಲ್ಲಿಗೂ ಹೋಗುವುದಿಲ್ಲ.</p>
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
  const due = dueItems(s);
  const wk = weekNum(), ch = challengeOfWeek();
  const ticks = s.challengeTicks[wk] || [false, false, false];
  const tick = (i) => api.update((st) => {
    const t = [...(st.challengeTicks[wk] || [false, false, false])]; t[i] = !t[i];
    const n = { ...st, challengeTicks: { ...st.challengeTicks, [wk]: t } };
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

        <div className="card today">
          <div className="sec-t">ಅಭ್ಯಾಸಃ — ಇಂದಿನ ಅಭ್ಯಾಸ</div>
          {next ? (<>
            <p>ಮುಂದಿನ ಪಾಠ: <b>ಪದ #{pad3(next.id)}</b>{due.length > 0 && <> · ಪುನರಾವರ್ತನೆಗೆ {due.length}</>}</p>
            <Btn wide onClick={() => api.go({ kind: "lesson" })}>ಇಂದಿನ ಪಾಠ ಆರಂಭಿಸಿ</Btn>
          </>) : (<>
            <p>ಈಗಿರುವ ಎಲ್ಲಾ {words.length} ಪದಗಳೂ ಕಲಿತಾಯಿತು 🎉 ಈಗ ಪುನರಾವರ್ತನೆ ಮತ್ತು ವಾಕ್ಯಗಳು.</p>
            <Btn wide onClick={() => due.length ? api.go({ kind: "review" }) : setTab("learn")}>{due.length ? `ಪುನರಾವರ್ತನೆ ಮಾಡಿ (${due.length})` : "ವಾಕ್ಯಗಳನ್ನು ಕಲಿಯಿರಿ"}</Btn>
          </>)}
          {next && due.length > 0 && <Btn wide kind="line" onClick={() => api.go({ kind: "review" })}>ಪುನರಾವರ್ತನೆ ಮಾಡಿ ({due.length})</Btn>}
        </div>

        {w && <ScriptCard item={w} p={s} split={w.split} tip={w.tip} tag="ಶಬ್ದಃ — ಇಂದಿನ ಪದ"
          onShare={() => api.share(shareWord(w, s))} onReport={() => api.report("w", w.id, `ಪದ: ${w.d}`)} />}
        {x && <ScriptCard item={x} p={s} tag="ವಾಕ್ಯಮ್ — ಇಂದಿನ ವಾಕ್ಯ"
          onShare={() => api.share(shareSentence(x, s))} onReport={() => api.report("s", x.id, `ವಾಕ್ಯ: ${x.d}`)} />}

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

function dueItems(s) {
  const w = visWords(s).filter((v) => s.learned.includes(v.id) && isDue(s, "w" + v.id)).map((v) => ({ t: "w", v }));
  const x = visSents(s).filter((v) => s.sentences.includes(v.id) && isDue(s, "s" + v.id)).map((v) => ({ t: "s", v }));
  return [...w, ...x];
}

/* ═══════════════════ learn path ═══════════════════ */
function Learn({ api }) {
  const { s } = api;
  const W = visWords(s), S = visSents(s), D = visDias(s);
  const lv = [
    { n: 0, t: "ಹಂತ 0 — ಪರಿಚಯ", d: "ಅಕ್ಷರ ಮತ್ತು ಉಚ್ಚಾರಣೆ", k: "l0", pr: s.l0done ? "ಮುಗಿದಿದೆ ✓" : "ಬಿಡಬಹುದು" },
    { n: 1, t: "ಹಂತ 1 — ಪ್ರಥಮಪದಾನಿ", d: `${W.length} ಪದಗಳು`, k: "l1", pr: `${s.learned.length} / ${W.length}` },
    { n: 2, t: "ಹಂತ 2 — ಸರಳವಾಕ್ಯಾನಿ", d: `${S.length} ವಾಕ್ಯಗಳು`, k: "l2", pr: `${s.sentences.length} / ${S.length}` },
    { n: 3, t: "ಹಂತ 3 — ಸಂವಾದಃ", d: `${D.length} ಸಂಭಾಷಣೆಗಳು`, k: "l3", pr: `${s.dialogues.length} / ${D.length}` },
    { n: 4, t: "ಹಂತ 4 — ಸರಳವ್ಯಾಕರಣಮ್", lock: true },
    { n: 5, t: "ಹಂತ 5 — ಸುಭಾಷಿತಮ್", lock: true },
    { n: 6, t: "ಹಂತ 6 — ವಾಚನಮ್", lock: true },
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
        <div className="card goal"><b>🪷 ಸಂಸ್ಕೃತಸಾಧಕಃ</b><span className="muted">ಪ್ರಯಾಣದ ಗುರಿ</span></div>
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
    return (fresh.length ? fresh : W).slice(0, 5);
  });
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
    <Done api={api} title="ಅದ್ಭುತಮ್ 🎉" line={`ಇಂದು ನೀವು ${set.length} ಹೊಸ ಸಂಸ್ಕೃತ ಪದಗಳನ್ನು ಕಲಿತಿರಿ. ಅಭ್ಯಾಸದಲ್ಲಿ ${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ.`}
      shareText={shareLesson(set, s)} />
  );
  if (phase === "quiz") return <Quiz qs={qs} p={s} title="ಅಭ್ಯಾಸ" onBack={api.close} onGrade={api.grade} onFinish={(sc, t) => setRes({ s: sc, t })} />;

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
  const mark = (x) => api.update((st) => touch(st.sentences.includes(x.id) ? st
    : { ...st, sentences: [...st.sentences, x.id], xp: st.xp + 3, srs: { ...st.srs, ["s" + x.id]: { lvl: 1, due: dayNum() + 1 } } }));
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
      <Header title={d.t} sub="ಪ್ರತಿ ಸಾಲನ್ನೂ ಗಟ್ಟಿಯಾಗಿ ಹೇಳಿ" onBack={api.close} />
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

/* ═══════════════════ practice ═══════════════════ */
function Practice({ api }) {
  const { s } = api;
  const W = visWords(s);
  const counts = [0, 0, 0, 0];
  W.forEach((w) => counts[wordState(s, w.id)]++);
  const due = dueItems(s);
  const labels = ["ಹೊಸದು", "ಕಲಿಯುತ್ತಿದೆ", "ಪುನರಾವರ್ತನೆ ಬೇಕು", "ಕರಗತ"];
  return (
    <>
      <Header title="ಅಭ್ಯಾಸ" sub="ಮರೆಯುವ ಮೊದಲು ಮತ್ತೊಮ್ಮೆ" />
      <div className="pad">
        <div className="card stats">{labels.map((l, i) => <div key={i} className="stat"><b>{counts[i]}</b><span>{l}</span></div>)}</div>
        <Btn wide disabled={!due.length} onClick={() => api.go({ kind: "review" })}>ಇಂದಿನ ಪುನರಾವರ್ತನೆ ({due.length})</Btn>
        {!due.length && <p className="muted center">ಇಂದು ಪುನರಾವರ್ತಿಸಲು ಏನೂ ಇಲ್ಲ. ಹೊಸ ಪಾಠ ಆರಂಭಿಸಿ 🌿</p>}
        <Btn wide kind="line" disabled={s.sentences.length < 2} onClick={() => api.go({ kind: "squiz" })}>ವಾಕ್ಯ ಅಭ್ಯಾಸ</Btn>
        <Btn wide kind="line" disabled={!s.learned.length} onClick={() => api.go({ kind: "flash" })}>ಫ್ಲ್ಯಾಶ್ ಕಾರ್ಡ್</Btn>
        <Btn wide kind="line" disabled={!s.mistakes.length} onClick={() => api.go({ kind: "review", mistakes: true })}>ತಪ್ಪುಗಳ ಪುಸ್ತಕ ({s.mistakes.length})</Btn>
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
    const W = visWords(s), S = visSents(s);
    let items;
    if (mistakes) {
      items = s.mistakes.map((k) => k[0] === "w" ? { t: "w", v: W.find((w) => "w" + w.id === k) } : { t: "s", v: S.find((x) => "s" + x.id === k) }).filter((x) => x.v);
    } else items = dueItems(s);
    items = shuffle(items).slice(0, 12);
    const ws = items.filter((x) => x.t === "w").map((x) => x.v);
    const q = items.map((x, i) => x.t === "w" ? wordQ(x.v, W, s.showDeva)
      : (alignable(x.v) && x.v.parts.length >= 2 ? sentQ(x.v, S, i) : null)).filter(Boolean);
    if (!mistakes && ws.length >= 6 && distinct(ws, 4).length === 4) q.push(matchQ(ws));
    return shuffle(q);
  }, []);
  const title = mistakes ? "ತಪ್ಪುಗಳ ಪುಸ್ತಕ" : "ಪುನರಾವರ್ತನೆ";
  if (!qs.length) return <><Header title={title} onBack={api.close} /><div className="pad"><p className="lead">ಇಂದು ಪುನರಾವರ್ತಿಸಲು ಏನೂ ಇಲ್ಲ. ಹೊಸ ಪಾಠ ಆರಂಭಿಸಿ 🌿</p><Btn wide onClick={api.close}>ಹಿಂದೆ</Btn></div></>;
  if (res) return <Done api={api} title="ಸಾಧು 🌿" line={`${title} ಪೂರ್ಣ — ${res.t} ರಲ್ಲಿ ${res.s} ಸರಿ. ತಪ್ಪಾದವು ತಪ್ಪುಗಳ ಪುಸ್ತಕದಲ್ಲಿ ಸೇರಿವೆ. ಮತ್ತೆ ಬರುತ್ತವೆ.`} />;
  return <Quiz qs={qs} p={s} title={title} onBack={api.close} onGrade={api.grade} onFinish={(sc, t) => setRes({ s: sc, t })} />;
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
  const W = visWords(s), S = visSents(s);
  const hw = t ? W.filter((w) => (w.k + " " + w.d + " " + w.m).toLowerCase().includes(t)).slice(0, 15) : [];
  const hs = t ? S.filter((x) => (x.k + " " + x.d + " " + x.m).toLowerCase().includes(t)).slice(0, 10) : [];
  return (
    <>
      <Header title="ಶಬ್ದಕೋಶ" sub="ಕನ್ನಡ ಅಥವಾ ಸಂಸ್ಕೃತ ಪದ ಬರೆಯಿರಿ" onBack={api.close} />
      <div className="pad">
        <input className="input" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="ಉದಾ: ನೀರು" aria-label="ಹುಡುಕಿ" />
        {t && !hw.length && !hs.length && <p className="muted">ಈ ಪದ ಇನ್ನೂ ಶಬ್ದಕೋಶದಲ್ಲಿ ಇಲ್ಲ. ಪಾಠಗಳು ಬೆಳೆದಂತೆ ಸೇರುತ್ತದೆ.</p>}
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
      </div>
    </>
  );
}

/* ═══════════════════ circle ═══════════════════ */
function Circle({ api }) {
  const { s } = api;
  const W = visWords(s), S = visSents(s);
  const w = W[dayNum() % W.length], x = S[dayNum() % S.length];
  const lastBadge = BADGES.find((b) => b.id === s.badges[s.badges.length - 1]);
  const prompts = [
    { p: "ಇಂದು ಕಲಿತ ಪದವನ್ನು ಮಂಡಲದಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareWord(w, s) },
    { p: "ಇಂದಿನ ವಾಕ್ಯವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareSentence(x, s) },
    { p: "ಇಂದು ಸಂಸ್ಕೃತವನ್ನು ಎಲ್ಲಿ ಬಳಸಿದಿರಿ? ಕನ್ನಡದಲ್ಲಿ ಬರೆದು ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareFree("ಇಂದು ನಾನು ಸಂಸ್ಕೃತವನ್ನು ಬಳಸಿದ್ದು:", s) },
    { p: "ಯಾವ ಪದ ಕಷ್ಟವಾಯಿತು? ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ.", t: () => shareFree("ನನಗೆ ಕಷ್ಟವಾದ ಪದ / ನನ್ನ ಪ್ರಶ್ನೆ:", s) },
    ...(lastBadge ? [{ p: "ನಿಮ್ಮ ಸಾಧನೆಯ ಬ್ಯಾಡ್ಜ್ ಹಂಚಿಕೊಳ್ಳಿ.", t: () => shareBadge(lastBadge, s) }] : []),
  ];
  const pr = prompts[dayNum() % prompts.length];
  return (
    <>
      <Header title="ಸಂಸ್ಕೃತಮಂಡಲಮ್" sub="ನಾವು ಕಲಿತದ್ದನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಜಾಗ" />
      <div className="pad">
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

/* ═══════════════════ me ═══════════════════ */
function Me({ api }) {
  const { s, update, flash } = api;
  const [name, setName] = useState(s.name);
  const [code, setCode] = useState("");
  const copy = (t, msg) => (navigator.clipboard?.writeText(t) || Promise.reject()).then(() => flash(msg), () => flash("ನಕಲಿಸಲು ಆಗಲಿಲ್ಲ. ಕೈಯಾರೆ ಆರಿಸಿ ನಕಲಿಸಿ."));
  const reportText = s.reports.length
    ? `ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್ — ತಪ್ಪಿನ ವರದಿ (${s.name})\n\n` + s.reports.map((r, i) => `${i + 1}. ${r.label}${r.note ? ` — ${r.note}` : ""} (${r.on})`).join("\n")
    : "";
  const restore = (i) => update((st) => ({ ...st, reports: st.reports.filter((_, j) => j !== i) }));
  const doImport = () => { try { const d = importCode(code); setCode(""); api.openImport(d); } catch { flash("ಈ ಕೋಡ್ ಸರಿಯಿಲ್ಲ."); } };
  return (
    <>
      <Header title="ನಿಮ್ಮ ಪ್ರಯಾಣ" />
      <div className="pad">
        <div className="card stats">
          {[[s.learned.length, "ಕಲಿತ ಪದಗಳು"], [s.sentences.length, "ಕಲಿತ ವಾಕ್ಯಗಳು"], [s.dialogues.length, "ಸಂಭಾಷಣೆಗಳು"], [`🔥 ${s.streak}`, "ಸರಣಿ"], [`⭐ ${s.xp}`, "ಅಂಕ"]]
            .map(([v, l]) => <div key={l} className="stat"><b>{v}</b><span>{l}</span></div>)}
        </div>

        <div className="sec-t">ಸಾಧನೆಗಳು</div>
        <div className="badges">
          {BADGES.map((b) => {
            const on = s.badges.includes(b.id);
            return <button type="button" key={b.id} className={`badge${on ? " on" : ""}`} disabled={!on} onClick={() => api.share(shareBadge(b, s))}>
              <b>{on ? "🏅" : "○"} {b.t}</b><span>{b.d}</span></button>;
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
            <Btn small disabled={!name.trim() || name.trim() === s.name} onClick={() => { update({ name: name.trim() }); flash("ಹೆಸರು ಉಳಿಸಲಾಗಿದೆ"); }}>ಉಳಿಸಿ</Btn></div>
        </div>

        <div className="sec-t">ವರದಿಯಾದ ತಪ್ಪುಗಳು</div>
        <div className="card">
          {!s.reports.length ? <p className="muted">ಯಾವುದೇ ವರದಿ ಇಲ್ಲ.</p> : (<>
            <p className="small">{s.reports.length} ವರದಿ. ವರದಿಯಾದ ವಸ್ತು ನಿಮ್ಮ ಪಾಠಗಳಿಂದ ಮರೆಯಾಗಿದೆ. ಈ ಪಟ್ಟಿಯನ್ನು ಕಲ್ಪತರು ತಂಡಕ್ಕೆ ಕಳಿಸಿ.</p>
            {s.reports.map((r, i) => (
              <div key={i} className="rep"><span>{r.label}{r.note ? <em> — {r.note}</em> : null}</span>
                <button type="button" className="link" onClick={() => restore(i)}>ಮರಳಿ ತೋರಿಸು</button></div>
            ))}
            <div className="row two">
              <Btn small kind="line" onClick={() => copy(reportText, "ವರದಿ ಪಟ್ಟಿ ನಕಲಾಗಿದೆ")}>ಪಟ್ಟಿ ನಕಲಿಸಿ</Btn>
              <a className="btn btn-line small" href={`https://wa.me/?text=${encodeURIComponent(reportText)}`} target="_blank" rel="noopener">ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಳಿಸಿ</a>
            </div>
          </>)}
        </div>

        <div className="sec-t">ಪ್ರಗತಿಯ ಬ್ಯಾಕಪ್</div>
        <div className="card">
          <p className="small">ನಿಮ್ಮ ಪ್ರಗತಿ ಈ ಫೋನಿನ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಉಳಿಯುತ್ತದೆ. ಫೋನ್ ಬದಲಿಸುವ ಮೊದಲು ಅಥವಾ ಬ್ರೌಸರ್ ಡೇಟಾ ಅಳಿಸುವ ಮೊದಲು ಈ ಲಿಂಕ್ ಅನ್ನು ನಿಮಗೇ ಕಳಿಸಿಕೊಳ್ಳಿ. ಅದನ್ನು ಒತ್ತಿದರೆ ಪ್ರಗತಿ ಮರಳಿ ಬರುತ್ತದೆ.</p>
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
    api.update((st) => ({ ...st, reports: [...st.reports, { ...r, note: note.trim() || undefined, on: new Date().toISOString().slice(0, 10) }] }));
    close();
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

function mergeState(a, b) {
  const srs = { ...a.srs };
  for (const [k, v] of Object.entries(b.srs || {})) if (!srs[k] || v.lvl > srs[k].lvl) srs[k] = v;
  const later = (a.lastDay || "") >= (b.lastDay || "") ? a : b;
  return {
    ...a,
    name: a.name || b.name, onboarded: true,
    learned: [...new Set([...a.learned, ...b.learned])],
    sentences: [...new Set([...a.sentences, ...b.sentences])],
    dialogues: [...new Set([...a.dialogues, ...b.dialogues])],
    badges: [...new Set([...a.badges, ...b.badges])],
    mistakes: [...new Set([...a.mistakes, ...b.mistakes])],
    reports: [...a.reports, ...b.reports.filter((r) => !a.reports.some((x) => x.kind === r.kind && x.id === r.id))],
    srs, xp: Math.max(a.xp, b.xp), streak: later.streak, lastDay: later.lastDay,
    challengeTicks: { ...b.challengeTicks, ...a.challengeTicks },
    shares: Math.max(a.shares, b.shares), l0done: a.l0done || b.l0done,
  };
}

function ImportSheet({ api, data, close }) {
  const doIt = () => { api.update((st) => mergeState(st, data)); close(); api.flash("ಪ್ರಗತಿ ಮರಳಿ ಬಂದಿದೆ 🌿"); };
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

const VIEWS = { l0: Level0, l1: Level1, lesson: Lesson, l2: Level2, squiz: SentenceQuiz, l3: Level3, dialogue: Dialogue, review: Review, flash: Flash, search: Search };
