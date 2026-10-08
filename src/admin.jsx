// ಗುರುದತ್ತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ — ksm.kalpatharu.org/admin
// Opens only for Google accounts listed in ADMIN_EMAILS (wrangler.jsonc).
import React, { useEffect, useMemo, useState } from "react";
import { getAuth, getConfig, fetchMe, fetchAdmin } from "./sync.js";
import { APP_URL } from "./lib.js";

const fmtDay = (d) => (d ? new Date(d + "T00:00:00").toLocaleDateString("kn-IN", { day: "numeric", month: "short" }) : "—");
const daysAgo = (d, today) => (d ? Math.round((new Date(today) - new Date(d)) / 864e5) : null);
const waLink = (p) => `https://wa.me/${p.replace(/\D/g, "")}`;

const FILTERS = [
  ["all", "ಎಲ್ಲರೂ"],
  ["active", "ಈ ವಾರ ಸಕ್ರಿಯ"],
  ["stopped", "ನಿಂತವರು"],
  ["nophone", "ಸಂಖ್ಯೆ ಇಲ್ಲದವರು"],
];
const SORTS = [
  ["weekPts", "ಈ ವಾರದ ಅಂಕ"],
  ["lastDay", "ಕೊನೆಯ ಚಟುವಟಿಕೆ"],
  ["words", "ಕಲಿತ ಪದಗಳು"],
  ["joined", "ಸೇರಿದ ದಿನ"],
];

function csv(members) {
  const head = ["ಹೆಸರು", "ಇಮೇಲ್", "ಮೊಬೈಲ್", "ಈ ವಾರದ ಅಂಕ", "ಈ ವಾರ ಕಲಿತ ದಿನ", "ಪದ", "ವಾಕ್ಯ", "ಸಂವಾದ", "ವ್ಯಾಕರಣ", "ಸುಭಾಷಿತ", "ವಾಚನ", "ಸರಣಿ", "ಕೊನೆಯ ಚಟುವಟಿಕೆ", "ಪಟ್ಟಿಗೆ ಒಪ್ಪಿಗೆ", "ಸೇರಿದ ದಿನ"];
  const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = members.map((m) => [m.name, m.email, m.phone, m.weekPts, m.weekDays, m.words, m.sentences, m.dialogues, m.grammar,
    m.subhashitas, m.readings, m.streak, m.lastDay || "", m.board ? "ಹೌದು" : "ಇಲ್ಲ", new Date(m.joined).toISOString().slice(0, 10)]);
  return "﻿" + [head, ...rows].map((r) => r.map(q).join(",")).join("\n");
}

// WhatsApp message for the circle — only members who agreed to show their name
function boardText(d) {
  const shown = d.members.filter((m) => m.board && m.name && m.weekPts > 0)
    .sort((a, b) => b.weekPts - a.weekPts || b.weekDays - a.weekDays);
  const medal = ["🥇", "🥈", "🥉"];
  const top = shown.slice(0, 10).map((m, i) => `${medal[i] || i + 1 + "."} ${m.name} — ${m.weekPts} ಅಂಕ`);
  const perfect = shown.filter((m) => m.weekDays === 7).map((m) => m.name);
  return [
    "🌿 ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್",
    `ವಾರದ ಸಾಧಕರು (${fmtDay(d.days[0])} – ${fmtDay(d.days[6])})`,
    "",
    ...(top.length ? top : ["ಈ ವಾರ ಪಟ್ಟಿಯಲ್ಲಿ ಯಾರೂ ಇಲ್ಲ."]),
    ...(perfect.length ? ["", "ಸತತ 7 ದಿನ ಕಲಿತವರು 🌿", perfect.join(", ")] : []),
    "",
    "ಎಲ್ಲರಿಗೂ ಅಭಿನಂದನೆಗಳು 🙏 ದಿನಕ್ಕೆ ಐದು ನಿಮಿಷ ಸಾಕು.",
    `ಆ್ಯಪ್: ${APP_URL}`,
  ].join("\n");
}

export default function Admin() {
  const [state, setState] = useState({ phase: "loading" });
  const [week, setWeek] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("weekPts");
  const [q, setQ] = useState("");

  useEffect(() => {
    let live = true;
    (async () => {
      const cfg = await getConfig();
      const a = getAuth();
      if (!cfg.enabled || !a) return live && setState({ phase: "signin" });
      try {
        const me = await fetchMe(a.token);
        if (!me.user.admin) return live && setState({ phase: "denied", email: me.user.email });
        const data = await fetchAdmin(a.token, week);
        if (live) setState({ phase: "ok", data });
      } catch (e) {
        if (live) setState({ phase: e.status === 401 ? "signin" : "error" });
      }
    })();
    return () => { live = false; };
  }, [week]);

  const d = state.data;
  const list = useMemo(() => {
    if (!d) return [];
    const weekAgo = new Date(new Date(d.today) - 6 * 864e5).toISOString().slice(0, 10);
    const s = q.trim().toLowerCase();
    return d.members
      .filter((m) => filter === "all" ? true
        : filter === "active" ? m.lastDay && m.lastDay >= weekAgo
        : filter === "stopped" ? !m.lastDay || m.lastDay < weekAgo
        : !m.phone)
      .filter((m) => !s || [m.name, m.email, m.phone].some((v) => (v || "").toLowerCase().includes(s)))
      .sort((a, b) => sort === "lastDay" ? (b.lastDay || "").localeCompare(a.lastDay || "")
        : (b[sort] - a[sort]) || (b.weekDays - a.weekDays));
  }, [d, filter, sort, q]);

  if (state.phase === "loading") return <Shell><p className="muted">ಸಿದ್ಧವಾಗುತ್ತಿದೆ…</p></Shell>;
  if (state.phase === "signin") return (
    <Shell><div className="card"><p>ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನೋಡಲು ಮೊದಲು ಆ್ಯಪ್‌ನ "ನಾನು" ಪರದೆಯಲ್ಲಿ Google ಖಾತೆಯಿಂದ ಲಾಗಿನ್ ಆಗಿ.</p>
      <a className="btn btn-solid small" href="/">ಆ್ಯಪ್‌ಗೆ ಹೋಗಿ</a></div></Shell>);
  if (state.phase === "denied") return (
    <Shell><div className="card"><p>{state.email} ಖಾತೆಗೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅನುಮತಿ ಇಲ್ಲ.</p><a className="btn btn-line small" href="/">ಆ್ಯಪ್‌ಗೆ ಹೋಗಿ</a></div></Shell>);
  if (state.phase === "error") return <Shell><div className="card"><p>ಮಾಹಿತಿ ತರಲು ಆಗಲಿಲ್ಲ. ಸ್ವಲ್ಪ ಹೊತ್ತಿನ ನಂತರ ಮತ್ತೆ ತೆರೆಯಿರಿ.</p></div></Shell>;

  const t = d.totals;
  const tiles = [
    [t.members, "ಒಟ್ಟು ಸದಸ್ಯರು", `ಈ ವಾರ ಹೊಸಬರು ${t.newWeek}`],
    [t.activeToday, "ಇಂದು ಕಲಿತವರು", ""],
    [t.activeWeek, "ಕಳೆದ 7 ದಿನ ಸಕ್ರಿಯ", ""],
    [t.stopped, "7 ದಿನದಿಂದ ನಿಂತವರು", ""],
    [t.perfectWeek, "ಸತತ 7 ದಿನ", "ಈ ವಾರ"],
    [t.withPhone, "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಕೊಟ್ಟವರು", `${t.members - t.withPhone} ಬಾಕಿ`],
  ];
  const download = () => {
    const url = URL.createObjectURL(new Blob([csv(list)], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = `sanskrit-mandala-${d.today}.csv`; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <Shell>
      <div className="adm-week">
        <button type="button" className="btn btn-line small" onClick={() => setWeek(d.week - 1)} aria-label="ಹಿಂದಿನ ವಾರ">←</button>
        <div><b>{fmtDay(d.days[0])} – {fmtDay(d.days[6])}</b><div className="muted small">{d.isCurrent ? "ಈ ವಾರ" : "ಹಿಂದಿನ ವಾರ"} · ಅಂಕಗಳು 200 ರಲ್ಲಿ</div></div>
        <button type="button" className="btn btn-line small" disabled={d.isCurrent} onClick={() => setWeek(d.week + 1)} aria-label="ಮುಂದಿನ ವಾರ">→</button>
      </div>

      <div className="adm-tiles">
        {tiles.map(([v, l, s]) => <div key={l} className="card adm-tile"><b>{v}</b><span>{l}</span>{s && <em>{s}</em>}</div>)}
      </div>

      <div className="card">
        <div className="sec-t">ವಾರದ ಸಾಧಕರ ಸಂದೇಶ</div>
        <p className="small">ಮೇಲಿನ ವಾರದ ಮೊದಲ 10 ಸಾಧಕರು ಮತ್ತು ಸತತ 7 ದಿನ ಕಲಿತವರು. ಪಟ್ಟಿಗೆ ಒಪ್ಪಿದವರ ಹೆಸರು ಮಾತ್ರ ಸೇರುತ್ತದೆ. {d.isCurrent ? "ವಾರ ಇನ್ನೂ ನಡೆಯುತ್ತಿದೆ — ಸೋಮವಾರ ಬೆಳಿಗ್ಗೆ ಹಿಂದಿನ ವಾರಕ್ಕೆ (←) ಹೋಗಿ ಕಳಿಸುವುದು ಉತ್ತಮ." : ""}</p>
        <pre className="adm-msg">{boardText(d)}</pre>
        <div className="row two">
          <button type="button" className="btn btn-line small" onClick={() => navigator.clipboard?.writeText(boardText(d)).then(() => alertOnce("ನಕಲಾಗಿದೆ"))}>ನಕಲಿಸಿ</button>
          <a className="btn btn-solid small" href={`https://wa.me/?text=${encodeURIComponent(boardText(d))}`} target="_blank" rel="noopener">ವಾಟ್ಸಾಪ್‌ಗೆ ಕಳಿಸಿ</a>
        </div>
      </div>

      <div className="card">
        <div className="adm-tools">
          <div className="seg">{FILTERS.map(([k, l]) => (
            <button type="button" key={k} className={filter === k ? "on" : ""} aria-pressed={filter === k} onClick={() => setFilter(k)}>{l}</button>))}</div>
          <div className="row">
            <input className="input adm-q" placeholder="ಹೆಸರು, ಇಮೇಲ್ ಅಥವಾ ಸಂಖ್ಯೆ ಹುಡುಕಿ" value={q} onChange={(e) => setQ(e.target.value)} aria-label="ಹುಡುಕಿ" />
            <select className="input adm-sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="ಕ್ರಮ">
              {SORTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
            <button type="button" className="btn btn-line small" onClick={download}>CSV ಡೌನ್‌ಲೋಡ್</button>
          </div>
        </div>
        <p className="muted small">{list.length} ಸದಸ್ಯರು</p>
        <div className="adm-scroll">
          <table className="adm-table">
            <thead><tr>
              <th>#</th><th>ಹೆಸರು</th><th className="num">ಈ ವಾರ</th><th className="num">ದಿನ</th><th>ಮೊಬೈಲ್</th>
              <th className="num">ಪದ</th><th className="num">ವಾಕ್ಯ</th><th className="num">ಇತರ</th><th className="num">🔥</th><th>ಕೊನೆಯದಾಗಿ</th><th>ಪಟ್ಟಿ</th>
            </tr></thead>
            <tbody>{list.map((m, i) => {
              const ago = daysAgo(m.lastDay, d.today);
              return (
                <tr key={m.email + i} className={ago === null || ago > 6 ? "stopped" : ""}>
                  <td className="muted">{i + 1}</td>
                  <td><b>{m.name || "—"}</b><div className="muted small">{m.email}</div></td>
                  <td className="num"><b>{m.weekPts}</b></td>
                  <td className="num">{m.weekDays}/7</td>
                  <td>{m.phone ? <a href={waLink(m.phone)} target="_blank" rel="noopener">{m.phone}</a> : <span className="muted">—</span>}</td>
                  <td className="num">{m.words}</td>
                  <td className="num">{m.sentences}</td>
                  <td className="num">{m.dialogues + m.grammar + m.subhashitas + m.readings}</td>
                  <td className="num">{m.streak}</td>
                  <td>{ago === null ? "—" : ago === 0 ? "ಇಂದು" : ago === 1 ? "ನಿನ್ನೆ" : `${ago} ದಿನದ ಹಿಂದೆ`}</td>
                  <td>{m.board ? "✓" : ""}</td>
                </tr>
              );
            })}</tbody>
          </table>
          {!list.length && <p className="muted center">ಯಾರೂ ಇಲ್ಲ.</p>}
        </div>
      </div>
      <p className="muted small">"ಇತರ" = ಸಂವಾದ + ವ್ಯಾಕರಣ + ಸುಭಾಷಿತ + ವಾಚನ. "ಪಟ್ಟಿ" ✓ = ವಾರದ ಸಾಧಕರ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ತೋರಿಸಲು ಒಪ್ಪಿದ್ದಾರೆ. ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಒತ್ತಿದರೆ ವಾಟ್ಸಾಪ್ ತೆರೆಯುತ್ತದೆ.</p>
    </Shell>
  );
}

function alertOnce(msg) {
  const el = document.createElement("div"); el.className = "toast"; el.textContent = msg;
  document.body.appendChild(el); setTimeout(() => el.remove(), 1800);
}

function Shell({ children }) {
  return (
    <div className="adm">
      <div className="adm-hdr"><div><div className="hdr-t">ಸಂಸ್ಕೃತ ಮಂಡಲ — ಡ್ಯಾಶ್‌ಬೋರ್ಡ್</div><div className="hdr-s">ಕಲ್ಪತರು ಸಂಸ್ಕೃತ ಮಂಡಲಮ್</div></div>
        <a className="btn btn-ghost small" href="/">ಆ್ಯಪ್‌ಗೆ →</a></div>
      {children}
    </div>
  );
}
