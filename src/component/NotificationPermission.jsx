import React, { useState, useEffect } from 'react';
import { checkNotificationPermission, requestNotificationPermission, requestForToken } from './firebase/NotificationToken';
import { toast } from 'react-toastify';

const NotificationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const status = checkNotificationPermission();
    setPermissionStatus(status);
    
    // Show prompt if permission is not granted and not denied
    if (status === 'default') {
      setShowPrompt(true);
    }
  }, []);

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      await requestForToken();
      setPermissionStatus('granted');
      setShowPrompt(false);
    } else {
      setPermissionStatus('denied');
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || permissionStatus === 'granted' || permissionStatus === 'denied' || permissionStatus === 'not-supported') {
    return null;
  }

  return (
    <div className="notification-permission-prompt" style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      maxWidth: '300px',
      fontSize: '14px'
    }}>
      <h5 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Enable Notifications</h5>
      <p style={{ margin: '0 0 15px 0', color: '#666' }}>
        Stay updated with important messages and updates from PressHop.
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleRequestPermission}
          style={{
            background: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Enable
        </button>
        <button
          onClick={handleDismiss}
          style={{
            background: '#6c757d',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Later
        </button>
      </div>
    </div>
  );
};

export default NotificationPermission; 