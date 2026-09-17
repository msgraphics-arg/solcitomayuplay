// Service worker dedicado de Firebase Cloud Messaging para el
// PANEL ADMIN. Tiene que llamarse exactamente
// "firebase-messaging-sw.js" (sin "-admin" en el nombre) y vivir
// en la raíz de ESTE repo (el del admin, al lado de admin.html).

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
// Ojo: lee de "data", no de "notification" — así es que se
// ejecuta este código en vez de que el navegador la muestre
// sola con su diseño genérico (eso era lo que hacía que
// apareciera agrupada bajo "Chrome" con un ícono gris y
// "MS Graphics Arg" en vez de "Solcito Mayu Play").
messaging.onBackgroundMessage((payload) => {

  const datos = payload.data || {};
  const titulo = datos.title || 'Solcito Mayu Play';

  const opciones = {
    body: datos.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { link: datos.link || './' }
  };

  self.registration.showNotification(titulo, opciones);

});

// Al tocar la notificación, abre (o enfoca) el panel admin.
self.addEventListener('notificationclick', (evento) => {

  evento.notification.close();

  const linkDestino = (evento.notification.data && evento.notification.data.link) || './';

  evento.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((listaClientes) => {

      for (const c of listaClientes) {
        if ('focus' in c) {
          return c.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(linkDestino);
      }

    })
  );

});
