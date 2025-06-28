import { messaging } from "../../firebase";
import { getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

// Check notification permission status
export const checkNotificationPermission = () => {
  if (!('Notification' in window)) {
    return 'not-supported';
  }
  return Notification.permission;
};

// Request notification permission with better UX
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    toast.error('This browser does not support notifications');
    return false;
  }

  const permission = await Notification.requestPermission();
  
  if (permission === 'granted') {
    toast.success('Notification permission granted!');
    return true;
  } else if (permission === 'denied') {
    toast.error('Notification permission denied. You may not receive important updates.');
    return false;
  } else {
    toast.success('Notification permission not granted');
    return false;
  }
};

// Handle foreground notifications
export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      // Show toast notification for foreground messages
      if (payload.notification) {
        toast.success(
          <div>
            <strong>{payload.notification.title}</strong>
            <br />
            {payload.notification.body}
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
      
      resolve(payload);
    });
  });
};

// Test notification function
export const testNotification = () => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Test Notification', {
      body: 'This is a test notification from PressHop',
      icon: '/presshop_logo_1.png',
      tag: 'test-notification'
    });
  } else {
    toast.error('Notification permission not granted');
  }
};

export const requestForToken = async () => {
  try {
    // Check if the browser supports notifications
    if (!('Notification' in window)) {
      toast.error('This browser does not support notifications');
      return;
    }

    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) {
      toast.error('Service Worker not supported - notifications may not work');
      return;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      try {
        const currentToken = await getToken(messaging, { 
          vapidKey: "BNFALdFhcWIXJjwETVmxzs2X5KnUGM4NZ7PdK0pQLnOklFyiQJMaYOZesPKmODpUoW6l_oUqj3Vzcwh7fMMoUKE" 
        });
        
        if (currentToken) {
          localStorage.setItem("DeviceToken", currentToken);
        } else {
          toast.error('Could not generate notification token. Please check your browser settings.');
        }
      } catch (err) {
        toast.error(`Error setting up notifications: ${err.message}`);
      }
    } else if (permission === 'denied') {
      toast.error('Notification permission denied. You may not receive important updates.');
    } else {
      toast.error('Notification permission not granted');
    }
  } catch (error) {
    toast.error(`Error setting up notifications: ${error.message}`);
  }
};