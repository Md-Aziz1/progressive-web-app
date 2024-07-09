self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./src/master.css", "./images/logo192.png"]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        fetch(e.request)
            .then(response => {
                // If the response is successful, update the cache
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open("static").then(cache => {
                        cache.put(e.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // If the network request fails, serve from cache
                return caches.match(e.request);
            })
    );
});
