import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 51.5074,
  lng: -0.1278,
};

const libraries = ['places'];

const MarkPin = ({setstreet_address, setDetails}) => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyApYpgGb1pLhudPj9EBdMxd8tArd0nGp5M",
      libraries,
    });
  
    const [markerPosition, setMarkerPosition] = useState(null);
  
    const handleMapClick = (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
    };
  
    const handleMarkerDragEnd = (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
    };
  
    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';
  
    return (
      <GoogleMap
        zoom={7}
        center={center}
        onClick={handleMapClick}
        mapContainerStyle={{ height: "142px", width: "100%" }}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    );
  };
  
export default MarkPin;
