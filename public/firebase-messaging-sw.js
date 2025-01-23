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

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
messaging.onMessage(messaging, (payload) => {
  // ...
})