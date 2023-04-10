const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST); // TODO: where is __WB_MANIFEST configured?

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

const assetCache = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60,
      maxEntries: 100, // limit to 100 cached assets to prevent the cache storage from becoming too large
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Implement HTML pages caching
registerRoute(
  ({ request }) => request.mode === 'navigate', 
  pageCache
);


// // Implement asset caching
registerRoute(
  ({ request }) => ['style', 'script', 'worker', 'image'].includes(request.destination), 
  assetCache
);

// TODO: Bug fix
//Implement caching on fallback response when the network is unavailable; applicable to responses for all requests, regardless of the request method or destination
// registerRoute(
//   () => true,
//   offlineFallback({
//     fallback: new CacheFirst(),
//     cacheName: 'fallback',
//   })
// );