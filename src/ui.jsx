import React, { useState, useMemo, useEffect } from "react";
import { pad3, shuffle, pick, tokens } from "./lib.js";

export const FS = [0.86, 1, 1.2];

export function Btn({ children, kind = "solid", wide, small, disabled, onClick, ...rest }) {
  return (
    <button type="button" className={`btn btn-${kind}${wide ? " wide" : ""}${small ? " small" : ""}`}
      disabled={disabled} onClick={onClick} {...rest}>{children}</button>
  );
}

export function Header({ title, sub, onBack }) {
  return (
    <div className="hdr">
      {onBack && <button type="button" className="back" onClick={onBack} aria-label="ಹಿಂದೆ">←</button>}
      <div>
        <div className="hdr-t">{title}</div>
        {sub && <div className="hdr-s">{sub}</div>}
      </div>
    </div>
  );
}

export const Bar = ({ now, total }) => (
  <div className="bar" role="progressbar" aria-valuenow={now} aria-valuemax={total}>
    <div style={{ width: `${Math.min(100, (now / Math.max(1, total)) * 100)}%` }} />
  </div>
);

export function SrcLine({ item }) {
  if (item.status === "VERIFIED")
    return <span className="src ok">✓ ಪರಿಶೀಲಿತ{item.src ? ` — ${item.src}` : ""}</span>;
  return <span className="src">ಮೂಲ: ಪ್ರಾಥಮಿಕ ಪಠ್ಯ — ಪರಿಶೀಲನೆ ಬಾಕಿ</span>;
}

/* One Sanskrit item: Devanagari (optional) + Kannada script + meaning */
export function ScriptCard({ item, p, split, tip, tag, onReport, onShare, compact, children }) {
  const f = FS[p.fontStep] || 1;
  return (
    <div className={`card script${compact ? " compact" : ""}`}>
      {tag && <div className="tag">{tag}</div>}
      {p.showDeva && <div className="dev" style={{ fontSize: (compact ? 24 : 34) * f }}>{item.d}</div>}
      <div className="kan" style={{ fontSize: (compact ? 22 : 30) * f }}>{item.k}</div>
      {split && <div className="split">{split}</div>}
      <div className="mean" style={{ fontSize: 17 * f }}>{item.m}</div>
      {tip && <div className="tip">💡 {tip}</div>}
      {children}
      <div className="card-foot">
        <SrcLine item={item} />
        <span className="foot-acts">
          {onShare && <button type="button" className="link" onClick={onShare}>ಹಂಚಿಕೊಳ್ಳಿ</button>}
          {onReport && <button type="button" className="link warn" onClick={onReport}>ತಪ್ಪು ತಿಳಿಸಿ</button>}
        </span>
      </div>
    </div>
  );
}

export function Parts({ parts, p }) {
  return (
    <div className="parts">
      <div className="parts-h">ಪದಚ್ಛೇದ</div>
      {parts.map(([dv, mn], i) => (
        <div key={i} className="part">
          {p.showDeva && <span className="dev">{dv}</span>}
          <span className="part-m">{mn}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Question builders ─────────────────────────────────── */
// two meanings "clash" if they share any sense (ನಮಸ್ಕಾರ vs ನಮಸ್ಕಾರ, ವಂದನೆ)
const senses = (m) => m.split(/[,()]/).map((t) => t.trim()).filter(Boolean);
export const clash = (a, b) => a.k === b.k || senses(a.m).some((t) => senses(b.m).includes(t));
export function distinct(ws, n) {
  const out = [];
  for (const w of shuffle(ws)) { if (!out.some((o) => clash(o, w))) out.push(w); if (out.length === n) break; }
  return out;
}
export function wordQ(w, pool, showDeva) {
  const others = distinct(pool.filter((x) => x.id !== w.id && !clash(x, w)), 3);
  const kinds = showDeva ? ["m2w", "w2m", "d2k"] : ["m2w", "w2m"];
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  const base = { type: "mcq", key: "w" + w.id, kind };
  if (kind === "w2m") return { ...base, ask: "ಇದರ ಅರ್ಥವೇನು?", prompt: w.k, promptDev: showDeva ? w.d : null, answer: w.m, options: shuffle([w.m, ...others.map((o) => o.m)]) };
  if (kind === "d2k") return { ...base, ask: "ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಇದು ಯಾವುದು?", prompt: w.d, dev: true, answer: w.k, options: shuffle([w.k, ...others.map((o) => o.k)]) };
  return { ...base, ask: "ಸಂಸ್ಕೃತದಲ್ಲಿ ಇದು ಯಾವುದು?", prompt: w.m, answer: w.k, options: shuffle([w.k, ...others.map((o) => o.k)]) };
}
export function matchQ(ws0) {
  const ws = distinct(ws0, 4);
  return { type: "match", keys: ws.map((w) => "w" + w.id), pairs: ws.map((w) => ({ id: w.id, a: w.k, dv: w.d, b: w.m })) };
}
const kTokens = (x) => x.k.replace(/[.?]/g, "").trim().split(/\s+/);
export const alignable = (x) => kTokens(x).length === tokens(x).length;
export function arrangeQ(x) {
  const kt = kTokens(x), dt = tokens(x);
  const items = kt.map((k, i) => ({ i, k, d: dt[i] }));
  let order = shuffle(items);
  for (let n = 0; n < 5 && order.every((t, j) => t.i === j); n++) order = shuffle(items);
  return { type: "arrange", key: "s" + x.id, meaning: x.m, items: order, n: items.length };
}
export function fillQ(x, allSents) {
  const kt = kTokens(x), dt = tokens(x);
  const cands = kt.map((k, i) => i).filter((i) => kt[i].length > 1);
  const bi = cands[Math.floor(Math.random() * cands.length)] ?? 0;
  const pool = [];
  allSents.forEach((o) => { if (o.id !== x.id && alignable(o)) kTokens(o).forEach((t) => pool.push(t)); });
  const distract = pick([...new Set(pool)].filter((t) => t !== kt[bi]), 3);
  return {
    type: "fill", key: "s" + x.id, meaning: x.m,
    k: kt.map((t, i) => (i === bi ? "_____" : t)).join(" "),
    d: dt.map((t, i) => (i === bi ? "_____" : t)).join(" "),
    answer: kt[bi], options: shuffle([kt[bi], ...distract]),
  };
}
export const sentQ = (x, all, i) => (i % 2 === 0 && tokens(x).length >= 3 ? arrangeQ(x) : fillQ(x, all));
export function nextLineQ(dia, i, allDias) {
  const cur = dia.lines[i], nxt = dia.lines[i + 1];
  const others = [];
  allDias.forEach((d) => d.lines.forEach((l) => { if (l[2] !== nxt[2] && l[2] !== cur[2]) others.push(l[2]); }));
  return { type: "mcq", ask: "ಇದಕ್ಕೆ ಮುಂದಿನ ಉತ್ತರ ಯಾವುದು?", prompt: cur[2], sub: cur[3], promptDev: null, answer: nxt[2], options: shuffle([nxt[2], ...pick([...new Set(others)], 2)]) };
}
export function letterQ(pair, all) {
  const others = pick(all.filter((x) => x[1] !== pair[1]), 3);
  return { type: "mcq", ask: "ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಇದು ಯಾವ ಅಕ್ಷರ?", prompt: pair[0], dev: true, answer: pair[1], options: shuffle([pair[1], ...others.map((o) => o[1])]) };
}

/* ── Question views ────────────────────────────────────── */
function Mcq({ q, onDone }) {
  const [picked, setPicked] = useState(null);
  const right = picked === q.answer;
  return (
    <>
      <div className="card qcard">
        <div className="ask">{q.ask}</div>
        {q.promptDev && <div className="dev q-dev">{q.promptDev}</div>}
        <div className={`q-prompt${q.dev ? " dev" : ""}`}>{q.prompt}</div>
        {q.sub && <div className="q-sub">{q.sub}</div>}
      </div>
      {q.options.map((o) => {
        const cls = picked ? (o === q.answer ? " right" : o === picked ? " wrong" : " dim") : "";
        return <button type="button" key={o} className={`opt${cls}`}
          disabled={!!picked} onClick={() => setPicked(o)}>{o}</button>;
      })}
      {picked && (
        <div className="after">
          <div className={`verdict ${right ? "good" : ""}`}>{right ? "ಸರಿ 🌿" : "ಪರವಾಗಿಲ್ಲ. ಇದು ಮತ್ತೆ ಬರುತ್ತದೆ."}</div>
          <Btn wide onClick={() => onDone(q.key ? [[q.key, right]] : [], right)}>ಮುಂದೆ</Btn>
        </div>
      )}
    </>
  );
}

function Match({ q, onDone }) {
  const right = useMemo(() => shuffle(q.pairs), [q]);
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState([]);
  const [missed, setMissed] = useState([]);
  const [flash, setFlash] = useState(null);
  const tapRight = (pr) => {
    if (sel == null || done.includes(pr.id)) return;
    if (pr.id === sel) { setDone([...done, sel]); setSel(null); }
    else { setMissed((m) => [...new Set([...m, sel])]); setFlash(pr.id); setTimeout(() => setFlash(null), 450); }
  };
  const finished = done.length === q.pairs.length;
  return (
    <>
      <div className="card qcard"><div className="ask">ಜೋಡಿ ಮಾಡಿ — ಎಡದ ಪದ, ನಂತರ ಅದರ ಅರ್ಥ</div></div>
      <div className="match">
        <div>{q.pairs.map((pr) => (
          <button type="button" key={pr.id} disabled={done.includes(pr.id)}
            className={`opt m${sel === pr.id ? " sel" : ""}${done.includes(pr.id) ? " right" : ""}`}
            onClick={() => setSel(pr.id)}>{pr.a}</button>))}</div>
        <div>{right.map((pr) => (
          <button type="button" key={pr.id} disabled={done.includes(pr.id)}
            className={`opt m${done.includes(pr.id) ? " right" : ""}${flash === pr.id ? " wrong" : ""}`}
            onClick={() => tapRight(pr)}>{pr.b}</button>))}</div>
      </div>
      {finished && (
        <div className="after">
          <div className="verdict good">{missed.length ? "ಜೋಡಿ ಪೂರ್ಣ. ತಪ್ಪಿದವು ಮತ್ತೆ ಬರುತ್ತವೆ." : "ಎಲ್ಲವೂ ಸರಿ 🌿"}</div>
          <Btn wide onClick={() => onDone(q.pairs.map((pr) => ["w" + pr.id, !missed.includes(pr.id)]), missed.length === 0)}>ಮುಂದೆ</Btn>
        </div>
      )}
    </>
  );
}

function Arrange({ q, p, onDone }) {
  const [chosen, setChosen] = useState([]);
  const [checked, setChecked] = useState(null);
  const left = q.items.filter((t) => !chosen.includes(t));
  const check = () => setChecked(chosen.every((t, j) => t.i === j));
  const correct = [...q.items].sort((a, b) => a.i - b.i);
  return (
    <>
      <div className="card qcard">
        <div className="ask">ವಾಕ್ಯವನ್ನು ಸರಿಯಾದ ಕ್ರಮದಲ್ಲಿ ಜೋಡಿಸಿ</div>
        <div className="q-sub big">{q.meaning}</div>
      </div>
      <div className="slot">
        {chosen.length === 0 && <span className="slot-ph">ಕೆಳಗಿನ ಪದಗಳನ್ನು ಒತ್ತಿ</span>}
        {chosen.map((t) => (
          <button type="button" key={t.i} className="chip on" disabled={checked !== null}
            onClick={() => setChosen(chosen.filter((c) => c !== t))}>{t.k}{p.showDeva && <small className="dev">{t.d}</small>}</button>
        ))}
      </div>
      <div className="chips">
        {left.map((t) => (
          <button type="button" key={t.i} className="chip" disabled={checked !== null}
            onClick={() => setChosen([...chosen, t])}>{t.k}{p.showDeva && <small className="dev">{t.d}</small>}</button>
        ))}
      </div>
      {checked === null && <Btn wide disabled={chosen.length !== q.n} onClick={check}>ಪರೀಕ್ಷಿಸಿ</Btn>}
      {checked !== null && (
        <div className="after">
          <div className={`verdict ${checked ? "good" : ""}`}>{checked ? "ಸರಿಯಾದ ಕ್ರಮ 🌿" : "ಸರಿಯಾದ ಕ್ರಮ ಹೀಗಿದೆ:"}</div>
          {!checked && <div className="answer-line">{correct.map((t) => t.k).join(" ")}</div>}
          <Btn wide onClick={() => onDone([[q.key, checked]], checked)}>ಮುಂದೆ</Btn>
        </div>
      )}
    </>
  );
}

function Fill({ q, p, onDone }) {
  const [picked, setPicked] = useState(null);
  const right = picked === q.answer;
  return (
    <>
      <div className="card qcard">
        <div className="ask">ಖಾಲಿ ಜಾಗಕ್ಕೆ ಸರಿಯಾದ ಪದ ಆರಿಸಿ</div>
        {p.showDeva && <div className="dev q-dev">{q.d}</div>}
        <div className="q-prompt fillk">{q.k}</div>
        <div className="q-sub">{q.meaning}</div>
      </div>
      {q.options.map((o) => {
        const cls = picked ? (o === q.answer ? " right" : o === picked ? " wrong" : " dim") : "";
        return <button type="button" key={o} className={`opt${cls}`} disabled={!!picked} onClick={() => setPicked(o)}>{o}</button>;
      })}
      {picked && (
        <div className="after">
          <div className={`verdict ${right ? "good" : ""}`}>{right ? "ಸರಿ 🌿" : "ಪರವಾಗಿಲ್ಲ. ಇದು ಮತ್ತೆ ಬರುತ್ತದೆ."}</div>
          <Btn wide onClick={() => onDone([[q.key, right]], right)}>ಮುಂದೆ</Btn>
        </div>
      )}
    </>
  );
}

/* Runs a list of questions; reports grades as they happen */
export function Quiz({ qs, p, onGrade, onFinish, title, sub, onBack }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(qs.length === 0);
  const next = (grades, ok) => {
    if (grades.length) onGrade(grades);
    const sc = score + (ok ? 1 : 0);
    setScore(sc);
    if (i + 1 >= qs.length) { setEnd(true); onFinish && onFinish(sc, qs.length); }
    else setI(i + 1);
  };
  useEffect(() => { window.scrollTo(0, 0); }, [i]);
  const q = qs[i];
  if (end) return null;
  const V = { mcq: Mcq, match: Match, arrange: Arrange, fill: Fill }[q.type];
  return (
    <>
      <Header title={title} sub={sub || `${i + 1} / ${qs.length}`} onBack={onBack} />
      <div className="pad">
        <Bar now={i + 1} total={qs.length} />
        <V key={i} q={q} p={p} onDone={next} />
      </div>
    </>
  );
}

export { pad3 };
