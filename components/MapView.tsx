import React, { useEffect, useState } from 'react';
import { Platform, View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

// Props interface
interface Props {
  address?: string;
  coordinates?: { lat: number; lng: number };
  additionalMarkers?: Array<{ lat: number; lng: number; name?: string }>;
  providerName?: string;
  onInteractionChange?: boolean;
}

function NativeMap({ coordinates, additionalMarkers, providerName, onInteractionChange }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const generateHTML = () => {
      const markers = [];

      if (coordinates) {
        markers.push({ lat: coordinates.lat, lng: coordinates.lng, name: providerName });
      }

      additionalMarkers?.forEach(m => markers.push(m));

      const markersJS = markers
        .map(
          m =>
            `L.marker([${m.lat}, ${m.lng}]).addTo(map).bindPopup(${JSON.stringify(m.name || 'Location')});`
        )
        .join('\n');

      const center = coordinates || markers[0] || { lat: 48.2082, lng: 16.3738 };

      return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Map</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>html, body, #map { height: 100%; margin: 0}</style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map').setView([${center.lat}, ${center.lng}], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CartoDB'
    }).addTo(map);

    ${markersJS}
  </script>
</body>
</html>`;
    };

    setHtml(generateHTML());
  }, [coordinates, additionalMarkers]);

  if (!html) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        onTouchStart={() => onInteractionChange?.(true)}
        onTouchEnd={() => onInteractionChange?.(false)}
        onTouchCancel={() => onInteractionChange?.(false)}
        source={{ html }}
        style={StyleSheet.absoluteFill}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}


function WebMap({ coordinates, address, additionalMarkers, providerName }) {
  const React = require('react');
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  const L = require('leaflet');
  require('leaflet/dist/leaflet.css');

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  const markers = [];

  if (coordinates) {
      markers.push({ ...coordinates, name: providerName, address: address });
    }

  markers.push(...additionalMarkers);

  const center = coordinates || (additionalMarkers.length > 0 ? additionalMarkers[0] : { lat: 48.2082, lng: 16.3738 });

  return (
      <div style={{ height: 300, width: '100%', marginBottom: 12 }}>
    <MapContainer center={[center.lat, center.lng]} zoom={12} style={{ height: "100%", width: "100%"}}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors &copy; CartoDB"

        // classic OSM
        //attribution="&copy; OpenStreetMap contributors"
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m, idx) => (
        <Marker key={idx} position={[m.lat, m.lng]}>
          <Popup>
            <strong>{providerName}</strong><br />
            {m.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}

export default function MapView({ address, coordinates, additionalMarkers = [], providerName, onInteractionChange }: Props) {
  if (Platform.OS === 'web') {
    return <WebMap address={address} coordinates={coordinates} address={address} additionalMarkers={additionalMarkers} providerName={providerName} />;
  } else {
    return <NativeMap address={address} coordinates={coordinates} additionalMarkers={additionalMarkers} providerName={providerName} onInteractionChange={onInteractionChange} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
