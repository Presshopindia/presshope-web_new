import React, { useState, useEffect } from 'react';
import { checkNotificationPermission, testNotification, requestForToken } from './firebase/NotificationToken';
import { toast } from 'react-toastify';

const NotificationDebug = () => {
  const [permissionStatus, setPermissionStatus] = useState('');
  const [deviceToken, setDeviceToken] = useState('');
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    const status = checkNotificationPermission();
    setPermissionStatus(status);
    setDeviceToken(localStorage.getItem('DeviceToken') || '');
  }, []);

  const handleTestNotification = () => {
    testNotification();
  };

  const handleRefreshToken = async () => {
    await requestForToken();
    setDeviceToken(localStorage.getItem('DeviceToken') || '');
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(deviceToken);
    toast.success('Token copied to clipboard!');
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      maxWidth: '400px',
      fontSize: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h6 style={{ margin: 0, fontSize: '14px' }}>Notification Debug</h6>
        <button
          onClick={() => setShowDebug(!showDebug)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {showDebug ? '−' : '+'}
        </button>
      </div>
      
      {showDebug && (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Permission:</strong> {permissionStatus}
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Service Worker:</strong> {'serviceWorker' in navigator ? 'Supported' : 'Not Supported'}
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Notifications:</strong> {'Notification' in window ? 'Supported' : 'Not Supported'}
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong>Device Token:</strong>
            <div style={{ 
              wordBreak: 'break-all', 
              fontSize: '10px', 
              background: '#f5f5f5', 
              padding: '5px', 
              borderRadius: '4px',
              marginTop: '5px'
            }}>
              {deviceToken || 'No token available'}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            <button
              onClick={handleTestNotification}
              style={{
                background: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              Test Notification
            </button>
            
            <button
              onClick={handleRefreshToken}
              style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px'
              }}
            >
              Refresh Token
            </button>
            
            {deviceToken && (
              <button
                onClick={handleCopyToken}
                style={{
                  background: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                Copy Token
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDebug; 