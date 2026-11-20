import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";

// the dashboard is a separate file, loaded only on /admin — learners never download it
const isAdminPage = location.pathname.replace(/\/+$/, "") === "/admin";
const root = createRoot(document.getElementById("root"));
if (isAdminPage) import("./admin.jsx").then((m) => root.render(<m.default />));
else root.render(<App />);

// Offline support. Only on https (Cloudflare) — skipped on file:// previews.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
