// Offline cache. Pages and app code: network first (updates arrive at once),
// cached copy when offline. Fonts and icons: cache first.
const CACHE = "ksm-__VERSION__";
const SHELL = ["/", "/app.js", ...__CHUNKS__, "/manifest.webmanifest", "/icons/icon-192.png",
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
  if (url.pathname.startsWith("/api/")) return; // never cache the cloud API
  const staticAsset = url.pathname.startsWith("/fonts/") || url.pathname.startsWith("/icons/");
  if (staticAsset) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
    })));
    return;
  }
  // network first, but on a weak signal don't wait forever: after 3 s use the saved copy (if there is one);
  // the network answer still refreshes the cache for next time
  const key = req.mode === "navigate" ? "/" : url.pathname;
  const net = fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(key, copy)); }
    return res;
  });
  const cached = () => caches.match(key).then((hit) => hit || caches.match(req));
  const offline = () => cached().then((hit) => hit || Response.error());
  const slow = new Promise((r) => setTimeout(r, 3000)).then(cached).then((hit) => hit || net);
  e.respondWith(Promise.race([net.catch(offline), slow.catch(offline)]));
});

// Daily reminder: the push carries no text — one fixed, gentle line. Tapping it opens today's lesson.
self.addEventListener("push", (e) => {
  e.waitUntil(self.registration.showNotification("ಸಂಸ್ಕೃತ — ಇಂದಿನ ಐದು ನಿಮಿಷ 🌿", {
    body: "ಒಂದು ಪದ, ಒಂದು ವಾಕ್ಯ. ನಿಮಗೆ ಬಿಡುವಾದಾಗ ಬನ್ನಿ.", icon: "/icons/icon-192.png", badge: "/icons/icon-192.png",
    tag: "ksm-daily", renotify: false, data: { url: "/?go=lesson" },
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = e.notification.data?.url || "/";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((cs) => {
    for (const c of cs) if ("focus" in c) { c.navigate?.(url); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
