
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';

// Conditional imports for web only
let MapContainer: any, TileLayer: any, Marker: any, Popup: any, L: any;

if (Platform.OS === 'web') {
  try {
    const leaflet = require('react-leaflet');
    MapContainer = leaflet.MapContainer;
    TileLayer = leaflet.TileLayer;
    Marker = leaflet.Marker;
    Popup = leaflet.Popup;
    L = require('leaflet');
    
    // Fix for default markers in react-leaflet
    if (L && L.Icon && L.Icon.Default) {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  } catch (error) {
    console.warn('Leaflet not available on this platform:', error);
  }
}

interface MapViewProps {
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  additionalMarkers?: Array<{
    lat: number;
    lng: number;
    name: string;
  }>;
  providerName: string;
}

const MapView: React.FC<MapViewProps> = ({ address, coordinates, additionalMarkers = [], providerName }) => {
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

  // On mobile, show location information instead of interactive map
  if (Platform.OS !== 'web') {
    const allMarkers = [
      ...(mapCoordinates ? [{ lat: mapCoordinates.lat, lng: mapCoordinates.lng, name: providerName }] : []),
      ...additionalMarkers
    ];

    return (
      <View style={styles.mobileContainer}>
        <Text style={styles.mobileTitle}>Locations</Text>
        {address && (
          <Text style={styles.mobileAddress}>{address}</Text>
        )}
        {mapCoordinates && !address && (
          <Text style={styles.mobileAddress}>
            {mapCoordinates.lat.toFixed(4)}, {mapCoordinates.lng.toFixed(4)}
          </Text>
        )}
        {allMarkers.length > 0 && (
          <View style={styles.locationsContainer}>
            {allMarkers.map((marker, index) => (
              <View key={index} style={styles.locationItem}>
                <Text style={styles.locationName}>{marker.name}</Text>
                <Text style={styles.locationCoords}>
                  {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                </Text>
              </View>
            ))}
          </View>
        )}
        <Text style={styles.mobileNote}>
          Interactive maps are available on the web version.
        </Text>
      </View>
    );
  }

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

  // Check if leaflet components are available
  if (!MapContainer || !TileLayer || !Marker || !Popup) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Map components not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapContainer
        center={[mapCoordinates.lat, mapCoordinates.lng]}
        zoom={13}
        style={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Main marker */}
        <Marker position={[mapCoordinates.lat, mapCoordinates.lng]}>
          <Popup>
            <div>
              <strong>{providerName}</strong>
              {address && (
                <>
                  <br />
                  {address}
                </>
              )}
            </div>
          </Popup>
        </Marker>
        
        {/* Additional markers */}
        {additionalMarkers && additionalMarkers.length > 0 && 
          additionalMarkers.map((marker, index) => (
            <Marker key={`additional-${index}`} position={[marker.lat, marker.lng]}>
              <Popup>
                <div>
                  <strong>{marker.name}</strong>
                </div>
              </Popup>
            </Marker>
          ))
        }
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
  mobileContainer: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
    padding: 20,
  },
  mobileTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  mobileAddress: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
  },
  locationsContainer: {
    width: '100%',
    marginBottom: 12,
  },
  locationItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  locationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  locationCoords: {
    fontSize: 12,
    color: '#6b7280',
  },
  mobileNote: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
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
