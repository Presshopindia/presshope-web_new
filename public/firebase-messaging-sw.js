// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyA5aDquFlvcWaU84s0fv79pw0JgbwiwXCE",
  authDomain: "presshopdev-db299.firebaseapp.com",
  projectId: "presshopdev-db299",
  storageBucket: "presshopdev-db299.appspot.com",
  messagingSenderId: "750460561502",
  appId: "1:750460561502:web:e06a575c50f0e03040accf",
  measurementId: "G-HEXH5PGC0B"
}

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: '/presshop_logo_1.png', // Use your app icon
    badge: '/presshop_logo_1.png',
    tag: 'notification',
    requireInteraction: false,
    silent: false,
    data: payload.data || {}
  };

  // Show the notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  // Handle notification click - you can add custom logic here
  // For example, open a specific page or focus on the app
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      // If there's already a window/tab open with the target URL, focus it
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window/tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});