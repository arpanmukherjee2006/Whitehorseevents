// Service Worker for Image Caching
const CACHE_NAME = 'whitehorse-images-v1';
const IMAGE_CACHE_NAME = 'whitehorse-images';

// Install event - cache critical resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                '/landingpage.html',
                '/index.html',
                '/whitehorse logo.png',
                '/svg.png'
            ]);
        })
    );
});

// Fetch event - cache images on demand
self.addEventListener('fetch', event => {
    // Only cache image requests
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(IMAGE_CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    if (response) {
                        // Return cached image
                        return response;
                    }
                    
                    // Fetch and cache new image
                    return fetch(event.request).then(fetchResponse => {
                        // Only cache successful responses
                        if (fetchResponse.status === 200) {
                            cache.put(event.request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    });
                });
            })
        );
    }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});