// Service worker dedicado de Firebase Cloud Messaging.
// Tiene que llamarse exactamente "firebase-messaging-sw.js" y
// vivir en la raíz del sitio (al lado de panel.html) para que
// el navegador pueda mostrar notificaciones aunque el cliente
// no tenga la pestaña abierta.

importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDgthIt13AZ8-_7EpMLeitgEbUB2Uvl-zg",
  authDomain: "solcitomayuplay.firebaseapp.com",
  projectId: "solcitomayuplay",
  storageBucket: "solcitomayuplay.firebasestorage.app",
  messagingSenderId: "520969972417",
  appId: "1:520969972417:web:026b571c0f15ea2b5a0240"
});

const messaging = firebase.messaging();

// Notificación recibida con la app cerrada o en otra pestaña.
messaging.onBackgroundMessage((payload) => {

  const titulo = (payload.notification && payload.notification.title) || 'Solcito Mayu Play';

  const opciones = {
    body: (payload.notification && payload.notification.body) || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png'
  };

  self.registration.showNotification(titulo, opciones);

});

// Al tocar la notificación, abre (o enfoca) el panel del cliente.
self.addEventListener('notificationclick', (evento) => {

  evento.notification.close();

  evento.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((listaClientes) => {

      for (const c of listaClientes) {
        if (c.url.includes('panel.html') && 'focus' in c) {
          return c.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow('panel.html');
      }

    })
  );

});
