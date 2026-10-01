// Offline cache so RetroClock opens without a network once installed.
// Bump VERSION whenever any file changes, or phones keep the old copy.
const VERSION = "retroclock-v3";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
