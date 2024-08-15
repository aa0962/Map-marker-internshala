import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define markers with positions and labels
const markers = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];

const CenterMap = ({ position }) => {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
};

function MapComponent() {
  const [center, setCenter] = useState(markers[0].position);
  const [popupContent, setPopupContent] = useState({ label: '', position: '' });  // State to handle popup content

  // Custom icon
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <MapContainer center={center} zoom={5} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={customIcon}  // Apply the custom icon
          eventHandlers={{
            click: () => {
              setCenter(marker.position);  // Center the map on the clicked marker
              setPopupContent({  // Set popup content with both label and position
                label: marker.label,
                position: `Position: ${marker.position.join(', ')}`
              });
            },
          }}
        >
          <Popup>
            <div>
              <strong>{popupContent.label}</strong><br />
              {popupContent.position}
            </div>
          </Popup>  {/* Display popup content */}
        </Marker>
      ))}
      <CenterMap position={center} />
    </MapContainer>
  );
}

export default MapComponent;
