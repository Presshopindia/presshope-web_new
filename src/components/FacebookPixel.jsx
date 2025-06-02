import React, { useEffect } from 'react';
const PIXEL_ID=process.env.REACT_APP_PIXEL_ID

const FacebookPixel = () => {
  useEffect(() => {
    // Initialize Facebook Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    // Initialize with your Pixel ID
    fbq('init', PIXEL_ID);
    
    // Track PageView
    fbq('track', 'PageView');

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const script = document.querySelector('script[src="https://connect.facebook.net/en_US/fbevents.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <noscript>
      <img 
        height="1" 
        width="1" 
        src="https://www.facebook.com/tr?id=PIXEL_ID&ev=PageView&noscript=1"
        alt="Facebook Pixel"
      />
    </noscript>
  );
};

export default FacebookPixel; 