
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  providerName: string;
}

const MapView: React.FC<MapViewProps> = ({ address, coordinates, providerName }) => {
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCoordinates = async () => {
      try {
        if (coordinates) {
          setMapCoordinates(coordinates);
          setLoading(false);
          return;
        }

        if (address) {
          // Geocode the address using Nominatim (OpenStreetMap's geocoding service)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setMapCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
          } else {
            setError('Address not found');
          }
        }
      } catch (err) {
        setError('Failed to load map');
        console.error('Geocoding error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCoordinates();
  }, [address, coordinates]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (error || !mapCoordinates) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Map not available'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapContainer
        center={[mapCoordinates.lat, mapCoordinates.lng]}
        zoom={15}
        style={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[mapCoordinates.lat, mapCoordinates.lng]}>
          <Popup>
            <div>
              <strong>{providerName}</strong>
              {address && <br />}
              {address}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
  },
});

export default MapView;
