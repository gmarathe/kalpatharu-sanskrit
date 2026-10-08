import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import Admin from "./admin.jsx";

const isAdminPage = location.pathname.replace(/\/+$/, "") === "/admin";
createRoot(document.getElementById("root")).render(isAdminPage ? <Admin /> : <App />);

// Offline support. Only on https (Cloudflare) — skipped on file:// previews.
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
