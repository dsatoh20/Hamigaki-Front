// キャッシュ名とキャッシュするファイルのリスト
const CACHE_NAME = "hamigaki-calender-app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/static/js/main.js",
    "/static/css/main.css",
];

// インストールイベント
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("キャッシュ中:", urlsToCache);
            return cache.addAll(urlsToCache);
        })
    );
});

// リクエストが発生したときのキャッシュ戦略
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());  // キャッシュを上書き
                    return networkResponse;
                });
            })
            .catch(() => {
                return caches.match(event.request);  // ネットワークが使えない場合はキャッシュを使用
            })
    );
});

// Service Workerのアクティベーションとキャッシュの管理
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log("古いキャッシュを削除:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// クライアントでService Workerを強制更新
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
