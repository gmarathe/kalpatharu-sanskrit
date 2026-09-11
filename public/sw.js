// Offline cache. Pages and app code: network first (updates arrive at once),
// cached copy when offline. Fonts and icons: cache first.
const CACHE = "ksm-a2b380c065";
const SHELL = ["/", "/app.js", "/manifest.webmanifest", "/icons/icon-192.png",
  "/fonts/kn-400.woff2", "/fonts/kn-700.woff2", "/fonts/la-400.woff2", "/fonts/la-700.woff2",
  "/fonts/dv-400.woff2", "/fonts/dv-700.woff2"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const url = new URL(req.url);
  const staticAsset = url.pathname.startsWith("/fonts/") || url.pathname.startsWith("/icons/");
  if (staticAsset) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
    })));
    return;
  }
  e.respondWith(fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req.mode === "navigate" ? "/" : url.pathname, copy)); }
    return res;
  }).catch(() => caches.match(req.mode === "navigate" ? "/" : url.pathname).then((hit) => hit || caches.match(req))));
});
