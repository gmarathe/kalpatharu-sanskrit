// v3 — small things that make learning feel good: celebration, haptics, progress ring,
// week strip, record-yourself, image share cards, install button. No libraries.
import React, { useState, useEffect, useRef } from "react";
import { dayKey, dayNum, APP_URL } from "./lib.js";

/* ── haptics (Android only; iPhone ignores it) ── */
let hapticsOn = true;
export const setHaptics = (on) => { hapticsOn = on !== false; };
export function buzz(kind) {
  if (!hapticsOn || !navigator.vibrate) return;
  try { navigator.vibrate(kind === "bad" ? [35, 60, 35] : kind === "win" ? [20, 40, 20, 40, 60] : 18); } catch {}
}
const reduced = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── confetti: plain CSS pieces, removed after 2.6 s ── */
const COLORS = ["#B8581A", "#8F6E27", "#7A1F2B", "#3F6B3A", "#E8C877", "#D9822B"];
export function Confetti({ n = 70 }) {
  const [on, setOn] = useState(!reduced());
  useEffect(() => { const t = setTimeout(() => setOn(false), 2600); return () => clearTimeout(t); }, []);
  if (!on) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const left = Math.random() * 100, delay = Math.random() * 0.5, dur = 1.6 + Math.random() * 1.1;
        const rot = Math.random() * 360, c = COLORS[i % COLORS.length], w = 6 + Math.random() * 6;
        return <i key={i} style={{ left: `${left}%`, background: c, width: w, height: w * 1.6,
          animationDelay: `${delay}s`, animationDuration: `${dur}s`, transform: `rotate(${rot}deg)` }} />;
      })}
    </div>
  );
}

/* ── progress ring ── */
export function Ring({ pct, size = 64, stroke = 7, children, label }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, p = Math.max(0, Math.min(100, pct));
  return (
    <div className="ring" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--leaf2)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={p >= 100 ? "var(--ok)" : "var(--saffron)"} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset .6s ease" }} />
      </svg>
      <div className="ring-in">{children}</div>
    </div>
  );
}

/* ── this week, Monday to Sunday: learned ✓, shield 🛡️, today ── */
const WD = ["ಸೋ", "ಮಂ", "ಬು", "ಗು", "ಶು", "ಶ", "ಭಾ"];
export function WeekStrip({ s }) {
  const today = dayNum();
  const mon = today - ((today + 3) % 7); // weeks start Monday (same as weekNum)
  return (
    <div className="wstrip" aria-label="ಈ ವಾರದ ಕಲಿಕೆ">
      {WD.map((l, i) => {
        const d = dayKey(mon + i), learned = !!s.log?.[d] || s.lastDay === d, shield = (s.shieldDays || []).includes(d);
        const isToday = mon + i === today, future = mon + i > today;
        return (
          <div key={i} className={`wd${learned ? " on" : ""}${shield ? " sh" : ""}${isToday ? " today" : ""}${future ? " fut" : ""}`}>
            <span className="wd-dot">{learned ? "✓" : shield ? "🛡️" : ""}</span>
            <span className="wd-l">{l}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── record yourself, play it back. Nothing leaves the phone. ── */
export function Recorder({ label = "ನಿಮ್ಮ ಧ್ವನಿಯಲ್ಲಿ ಹೇಳಿ, ಕೇಳಿ" }) {
  const [st, setSt] = useState("idle"); // idle | rec | done | denied | none
  const [url, setUrl] = useState(null);
  const [secs, setSecs] = useState(0);
  const rec = useRef(null), timer = useRef(null);
  useEffect(() => () => { clearInterval(timer.current); try { rec.current?.stream?.getTracks().forEach((t) => t.stop()); } catch {} if (url) URL.revokeObjectURL(url); }, [url]);
  if (typeof window !== "undefined" && !(navigator.mediaDevices?.getUserMedia && window.MediaRecorder)) return null;
  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream), chunks = [];
      mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        clearInterval(timer.current);
        if (url) URL.revokeObjectURL(url);
        setUrl(URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || "audio/webm" })));
        setSt("done");
      };
      mr.stream = stream; rec.current = mr; mr.start();
      setSecs(0); setSt("rec");
      timer.current = setInterval(() => setSecs((x) => { if (x + 1 >= 15) { try { mr.stop(); } catch {} } return x + 1; }), 1000);
    } catch { setSt("denied"); }
  };
  const stop = () => { try { rec.current?.stop(); } catch {} };
  return (
    <div className="recbox">
      <div className="small muted">🎙️ {label}</div>
      {st === "rec" ? (
        <button type="button" className="btn btn-solid wide rec-on" onClick={stop}>● ನಿಲ್ಲಿಸಿ ({15 - secs})</button>
      ) : (
        <button type="button" className="btn btn-line wide" onClick={start}>{st === "done" ? "ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ" : "ಹೇಳಿ, ರೆಕಾರ್ಡ್ ಮಾಡಿ"}</button>
      )}
      {st === "done" && url && <audio className="rec-play" src={url} controls />}
      {st === "denied" && <p className="small muted">ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ಸಿಗಲಿಲ್ಲ. ಪರವಾಗಿಲ್ಲ — ಗಟ್ಟಿಯಾಗಿ ಹೇಳಿದರೆ ಸಾಕು.</p>}
      {st === "done" && <p className="small muted">ನಿಮ್ಮ ಧ್ವನಿ ಈ ಫೋನಿನಲ್ಲೇ ಇರುತ್ತದೆ; ಎಲ್ಲಿಗೂ ಕಳಿಸುವುದಿಲ್ಲ.</p>}
    </div>
  );
}

/* ── install button (Android Chrome's prompt; iPhone gets a short how-to) ── */
let deferredPrompt = null;
const installListeners = new Set();
if (typeof window !== "undefined") {
  addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredPrompt = e; installListeners.forEach((f) => f()); });
  addEventListener("appinstalled", () => { deferredPrompt = null; installListeners.forEach((f) => f()); });
}
const standalone = () => typeof matchMedia === "function" && (matchMedia("(display-mode: standalone)").matches || navigator.standalone);
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
export function InstallCard() {
  const [, force] = useState(0);
  const [ios, setIos] = useState(false);
  useEffect(() => { const f = () => force((x) => x + 1); installListeners.add(f); return () => installListeners.delete(f); }, []);
  if (standalone()) return null;
  if (deferredPrompt) return (
    <div className="card install">
      <div><b>📲 ಆ್ಯಪ್ ಆಗಿ ಸೇರಿಸಿ</b><div className="small muted">ಫೋನಿನ ಮುಖಪುಟದಲ್ಲಿ ಒಂದು ಐಕಾನ್. ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದಿದ್ದರೂ ತೆರೆಯುತ್ತದೆ.</div></div>
      <button type="button" className="btn btn-solid small" onClick={async () => { const p = deferredPrompt; deferredPrompt = null; force((x) => x + 1); try { await p.prompt(); } catch {} }}>ಸೇರಿಸಿ</button>
    </div>
  );
  if (isIOS()) return (
    <div className="card install col">
      <button type="button" className="link" onClick={() => setIos(!ios)}>📲 iPhone‌ನಲ್ಲಿ ಆ್ಯಪ್ ಆಗಿ ಸೇರಿಸುವುದು ಹೇಗೆ?</button>
      {ios && <p className="small">Safari‌ನಲ್ಲಿ ಕೆಳಗಿನ ಹಂಚಿಕೆ ಗುರುತು (⬆️) ಒತ್ತಿ → "Add to Home Screen" ಆರಿಸಿ.</p>}
    </div>
  );
  return null;
}

/* ═══ image share cards (drawn on canvas — reliable with Indic fonts) ═══ */
async function fontsReady() {
  try {
    await Promise.all([
      document.fonts.load('700 80px "KSM Deva"', "संस्कृत"), document.fonts.load('400 40px "KSM Deva"', "संस्कृत"),
      document.fonts.load('700 80px "KSM Kannada"', "ಕನ್ನಡ"), document.fonts.load('400 40px "KSM Kannada"', "ಕನ್ನಡ"),
    ]);
  } catch {}
}
function wrap(ctx, text, maxW) {
  const words = String(text).split(/\s+/), lines = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}
// fit a block of lines into width by shrinking the font
function fit(ctx, lines, family, weight, start, min, maxW) {
  let size = start;
  for (; size > min; size -= 4) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (lines.every((l) => ctx.measureText(l).width <= maxW)) break;
  }
  return size;
}
/* card = { tag, dev: string|string[], kan: string|string[], mean, foot } */
export async function drawCard(card, name) {
  await fontsReady();
  const W = 1080, H = 1350, cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const x = cv.getContext("2d");
  const DEV = '"KSM Deva", serif', KAN = '"KSM Kannada", serif';
  // background
  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#8A2533"); g.addColorStop(1, "#4A0F18");
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  // faint mandala rings
  x.strokeStyle = "rgba(232,200,119,.14)"; x.lineWidth = 3;
  for (let r = 140; r < 900; r += 70) { x.beginPath(); x.arc(W - 60, 80, r, 0, Math.PI * 2); x.stroke(); }
  // header
  x.fillStyle = "#E8C877"; x.textAlign = "center";
  x.font = `700 40px ${KAN}`; x.fillText("ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್", W / 2, 110);
  x.font = `400 32px ${DEV}`; x.fillStyle = "rgba(255,240,210,.85)"; x.fillText("पठामः • वदामः • प्रसारयामः", W / 2, 162);
  // paper
  const px = 70, py = 220, pw = W - 140, ph = H - 400;
  x.fillStyle = "#FBF7EC";
  x.beginPath(); x.roundRect ? x.roundRect(px, py, pw, ph, 36) : x.rect(px, py, pw, ph); x.fill();
  x.strokeStyle = "#D8CBAE"; x.lineWidth = 2; x.stroke();
  const inner = pw - 120;
  // measure content to centre it vertically
  const dev = [].concat(card.dev || []).filter(Boolean), kan = [].concat(card.kan || []).filter(Boolean);
  const long = Math.max(dev.length, kan.length) > 1;
  x.font = `400 40px ${KAN}`;
  const meanLines = card.mean ? wrap(x, card.mean, inner).slice(0, 5) : [];
  const dSize = dev.length ? fit(x, dev, DEV, 700, long ? 74 : 132, 34, inner) : 0;
  const kSize = kan.length ? fit(x, kan, KAN, 700, long ? 68 : 108, 30, inner) : 0;
  const blocks = [
    card.tag ? 70 : 0,
    dev.length ? dev.length * dSize * 1.45 + 16 : 0,
    kan.length ? kan.length * kSize * 1.4 + 26 : 0,
    meanLines.length ? 30 + meanLines.length * 56 : 0,
  ];
  let y = py + (ph - blocks.reduce((a, b) => a + b, 0)) / 2;
  if (card.tag) { x.font = `700 34px ${KAN}`; x.fillStyle = "#8F6E27"; x.fillText(card.tag, W / 2, y + 40); y += 70; }
  if (dev.length) { x.font = `700 ${dSize}px ${DEV}`; x.fillStyle = "#33291E"; for (const l of dev) { y += dSize * 1.3; x.fillText(l, W / 2, y); } y += dSize * 0.15 + 16; }
  if (kan.length) { x.font = `700 ${kSize}px ${KAN}`; x.fillStyle = "#7A1F2B"; for (const l of kan) { y += kSize * 1.3; x.fillText(l, W / 2, y); } y += kSize * 0.1 + 26; }
  if (meanLines.length) {
    x.strokeStyle = "#D8CBAE"; x.beginPath(); x.moveTo(W / 2 - 80, y); x.lineTo(W / 2 + 80, y); x.stroke(); y += 30;
    x.font = `400 40px ${KAN}`; x.fillStyle = "#33291E";
    for (const l of meanLines) { y += 52; x.fillText(l, W / 2, y); }
  }
  // footer
  x.fillStyle = "#FFF3DA"; x.font = `700 38px ${KAN}`;
  if (name || card.foot) x.fillText([name, card.foot].filter(Boolean).join("  ·  "), W / 2, H - 112);
  x.fillStyle = "#E8C877"; x.font = `400 34px ${KAN}`;
  x.fillText(APP_URL.replace(/^https?:\/\//, "") + " — ದಿನಕ್ಕೆ ಐದು ನಿಮಿಷ", W / 2, H - 60);
  return new Promise((res) => cv.toBlob((b) => res(b), "image/png"));
}

// share the picture (Android: straight into WhatsApp); otherwise download it
export async function shareImage(blob, text) {
  const file = new File([blob], "sanskrit-mandala.png", { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], text }); return "shared"; }
    catch (e) { if (e?.name === "AbortError") return "cancel"; }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "sanskrit-mandala.png";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  return "downloaded";
}

/* ── growth-mindset lines for the end of a lesson (praise effort, not talent) ── */
export const COACH = [
  "ಪ್ರತಿದಿನದ ಐದು ನಿಮಿಷವೇ ನಿಜವಾದ ಸಾಧನೆ.",
  "ತಪ್ಪಾದ ಉತ್ತರಗಳೂ ಕಲಿಕೆಯ ಭಾಗ. ಅವು ಮತ್ತೆ ಬಂದಾಗ ಸುಲಭವಾಗುತ್ತವೆ.",
  "ನಿಧಾನವಾಗಿ, ನಿಯಮಿತವಾಗಿ — ಹೀಗೆಯೇ ಭಾಷೆ ಒಲಿಯುತ್ತದೆ.",
  "ಇಂದಿನ ಪ್ರಯತ್ನ ನಾಳೆಯ ನೆನಪಾಗುತ್ತದೆ.",
  "ಗಟ್ಟಿಯಾಗಿ ಹೇಳಿದ ಪದ ಬೇಗ ನೆನಪಿನಲ್ಲಿ ಉಳಿಯುತ್ತದೆ.",
  "ಸ್ವಲ್ಪ ಸ್ವಲ್ಪವಾಗಿ ಕಲಿತದ್ದು ಹೆಚ್ಚು ಕಾಲ ಉಳಿಯುತ್ತದೆ.",
];

/* ── trace a letter: the glyph is drawn faintly from the app's own font; the finger's path is compared with it.
   No stroke-order data — only "did you cover the letter without wandering far". ── */
export function Trace({ ch, onGood }) {
  const cv = useRef(null), mask = useRef(null), ink = useRef(null), last = useRef(null);
  const [res, setRes] = useState(null); // null | "good" | "more" | "out"
  const S = 300;
  const paint = () => {
    const x = cv.current.getContext("2d");
    x.clearRect(0, 0, S, S);
    x.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--line") || "#D8CBAE";
    x.font = '700 200px "KSM Deva", serif'; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(ch, S / 2, S / 2 + 10);
    x.drawImage(ink.current, 0, 0);
  };
  useEffect(() => {
    let live = true;
    const mk = () => { const c = document.createElement("canvas"); c.width = c.height = S; return c; };
    mask.current = mk(); ink.current = mk();
    (document.fonts?.load ? document.fonts.load('700 200px "KSM Deva"', ch) : Promise.resolve()).then(() => {
      if (!live) return;
      const m = mask.current.getContext("2d");
      m.font = '700 200px "KSM Deva", serif'; m.textAlign = "center"; m.textBaseline = "middle";
      m.fillStyle = "#000"; m.fillText(ch, S / 2, S / 2 + 10);
      paint();
    });
    return () => { live = false; };
  }, [ch]);
  const pos = (e) => { const r = cv.current.getBoundingClientRect(); return [((e.clientX - r.left) * S) / r.width, ((e.clientY - r.top) * S) / r.height]; };
  const down = (e) => { e.preventDefault(); cv.current.setPointerCapture?.(e.pointerId); last.current = pos(e); setRes(null); };
  const move = (e) => {
    if (!last.current) return;
    const p = pos(e), x = ink.current.getContext("2d");
    x.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--maroon") || "#7A1F2B";
    x.lineWidth = 16; x.lineCap = "round"; x.lineJoin = "round";
    x.beginPath(); x.moveTo(...last.current); x.lineTo(...p); x.stroke();
    last.current = p; paint();
  };
  const up = () => { last.current = null; };
  const clear = () => { ink.current.getContext("2d").clearRect(0, 0, S, S); setRes(null); paint(); };
  const check = () => {
    const g = mask.current.getContext("2d").getImageData(0, 0, S, S).data, k = ink.current.getContext("2d").getImageData(0, 0, S, S).data;
    // glyph pixels covered by ink (within ~10px), and ink far from the glyph
    const near = (d, x, y, r) => { for (let dy = -r; dy <= r; dy += 5) for (let dx = -r; dx <= r; dx += 5) { const X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < S && Y < S && d[(Y * S + X) * 4 + 3] > 60) return true; } return false; };
    let gl = 0, cov = 0, inkN = 0, out = 0;
    for (let y = 0; y < S; y += 3) for (let x = 0; x < S; x += 3) {
      const i = (y * S + x) * 4 + 3;
      if (g[i] > 60) { gl++; if (near(k, x, y, 10)) cov++; }
      if (k[i] > 60) { inkN++; if (!near(g, x, y, 15)) out++; }
    }
    const c = gl ? cov / gl : 0, o = inkN ? out / inkN : 1;
    const r = c >= 0.7 && o <= 0.3 ? "good" : o > 0.3 ? "out" : "more";
    setRes(r); buzz(r === "good" ? "ok" : "bad");
    if (r === "good") onGood?.();
  };
  return (
    <div className="trace">
      <canvas ref={cv} width={S} height={S} className={`trace-cv${res === "good" ? " good" : ""}`}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-label={`ಬರೆಯುವ ಜಾಗ: ${ch}`} />
      <div className={`verdict${res === "good" ? " good" : ""}`}>
        {res === "good" ? "ಚೆನ್ನಾಗಿದೆ 🌿" : res === "more" ? "ಅಕ್ಷರದ ಎಲ್ಲಾ ಭಾಗಗಳ ಮೇಲೂ ಬರೆಯಿರಿ." : res === "out" ? "ಗೆರೆ ಅಕ್ಷರದಿಂದ ಸ್ವಲ್ಪ ಹೊರಗೆ ಹೋಗಿದೆ. ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ." : " "}
      </div>
      <div className="row two"><button type="button" className="btn btn-line" onClick={clear}>ಅಳಿಸಿ</button><button type="button" className="btn btn-solid" onClick={check}>ಪರೀಕ್ಷಿಸಿ</button></div>
    </div>
  );
}

/* ── 🔊 read aloud with the phone's own Kannada voice (the Kannada script is the pronunciation guide,
   and a Kannada voice keeps every vowel — a Hindi voice would drop the final "a"). Hidden when the phone
   has no Kannada voice. This is a helper, not a reviewed recording. ── */
let knVoice = null, voiceOn = true;
const voiceSubs = new Set();
export const setVoice = (on) => { voiceOn = on !== false; voiceSubs.forEach((f) => f()); };
function findVoice() {
  try {
    const v = speechSynthesis.getVoices().find((x) => /^kn([-_]|$)/i.test(x.lang));
    if (v && v !== knVoice) { knVoice = v; voiceSubs.forEach((f) => f()); }
  } catch {}
}
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  findVoice();
  try { speechSynthesis.addEventListener("voiceschanged", findVoice); } catch {}
}
export function Speak({ text, small }) {
  const [, force] = useState(0);
  useEffect(() => { const f = () => force((x) => x + 1); voiceSubs.add(f); return () => voiceSubs.delete(f); }, []);
  if (!knVoice || !voiceOn || !text) return null;
  const say = (e) => {
    e.stopPropagation();
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/[.?।॥]/g, " "));
      u.voice = knVoice; u.lang = knVoice.lang; u.rate = 0.8;
      speechSynthesis.speak(u);
    } catch {}
  };
  return <button type="button" className={`speak${small ? " sm" : ""}`} onClick={say} aria-label="ಕೇಳಿ">🔊</button>;
}
