/**
 * CERCASP Service Worker
 * PWA y funcionalidad offline
 */

const CACHE_NAME = 'cercasp-v1';
const OFFLINE_URL = '/offline.html';

// Recursos a cachear inmediatamente
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/admin.html',
  '/css/variables.css',
  '/css/base.css',
  '/css/components.css',
  '/css/layout.css',
  '/css/accessibility.css',
  '/js/config/app-config.js',
  '/js/services/firebase-service.js',
  '/js/services/auth-service.js',
  '/js/services/encryption-service.js',
  '/js/services/storage-service.js',
  '/js/utils/validators.js',
  '/js/utils/sanitizers.js',
  '/js/utils/formatters.js',
  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando recursos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('[SW] Error al cachear recursos:', error);
      })
  );
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  self.clients.claim();
});

// Interceptar peticiones de red
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones a APIs externas - usar validación de hostname segura
  try {
    const url = new URL(event.request.url);
    const externalHosts = [
      'firebaseio.com',
      'googleapis.com',
      'gstatic.com',
      'firebaseapp.com'
    ];
    
    // Verificar si el hostname termina con alguno de los dominios externos
    const isExternalAPI = externalHosts.some(host => {
      return url.hostname === host || url.hostname.endsWith('.' + host);
    });
    
    if (isExternalAPI) {
      return;
    }
  } catch (e) {
    // URL inválida, continuar con el fetch normal
    console.warn('[SW] Invalid URL:', event.request.url);
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retornar del cache si existe
        if (response) {
          return response;
        }

        // Clonar petición
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // Verificar respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonar respuesta
            const responseToCache = response.clone();

            // Cachear para uso futuro
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Si falla, intentar retornar offline page
            return caches.match(OFFLINE_URL);
          });
      })
  );
});

// Sincronización en segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Sincronizando datos offline...');
    event.waitUntil(syncOfflineData());
  }
});

// Función para sincronizar datos offline
async function syncOfflineData() {
  try {
    // Abrir IndexedDB y sincronizar datos pendientes
    const db = await openIndexedDB();
    const offlineQueue = await getAllFromStore(db, 'offline_queue');

    for (const item of offlineQueue) {
      try {
        // TODO: Implementar sincronización directa con Firebase Firestore
        // Por ahora, registrar para desarrollo
        console.log('[SW] Item pendiente de sincronización:', item);
        
        // En producción, aquí se debe usar Firebase SDK para escribir directamente
        // Ejemplo: firebase.firestore().collection(item.collection).add(item.data)
        
        // Eliminar de la cola después de sincronizar
        // await deleteFromStore(db, 'offline_queue', item.id);
      } catch (error) {
        console.error('[SW] Error al sincronizar item:', error);
      }
    }

    console.log('[SW] Sincronización completada');
  } catch (error) {
    console.error('[SW] Error en sincronización:', error);
  }
}

// Helpers para IndexedDB
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('cercasp_db', 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getAllFromStore(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function deleteFromStore(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Notificaciones push (opcional)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'CERCASP';
  const options = {
    body: data.body || 'Nueva notificación',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-96x96.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Clic en notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
