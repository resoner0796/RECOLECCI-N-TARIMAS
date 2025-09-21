// Definimos un nombre y versión para nuestro cache
const CACHE_NAME = 'panel-recoleccion-v1';

// Listamos los archivos que queremos cachear
const urlsToCache = [
  'index.html',
  'manifest.json',
  // Scripts de Firebase y ZXing
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js',
  'https://unpkg.com/@zxing/library@latest'
  'icon-512x512.PNG'
  'icon-192x192.PNG'
  ];

// Evento 'install': se dispara cuando el Service Worker se instala
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto para Panel Recolección');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la página solicita un recurso
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si encontramos una respuesta en el cache, la devolvemos
        if (response) {
          return response;
        }
        // Si no está en cache, lo pedimos a la red
        return fetch(event.request);
      }
    )
  );
});
