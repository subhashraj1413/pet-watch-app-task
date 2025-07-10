import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function LocationScreen() {
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setError('Permission denied'); return; }
      const loc = await Location.getCurrentPositionAsync({});
      setCoords(loc.coords);
    })();
  }, []);

  if (error) return <Text>{error}</Text>;
  if (!coords) return <Text>Retrieving location…</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 12, fontSize: 16 }}>
        Lat {coords.latitude.toFixed(5)} / Lon {coords.longitude.toFixed(5)}
      </Text>

      {/* If you don’t have a Google Maps API key you can comment this out and keep the plain text */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker coordinate={{ latitude: coords.latitude, longitude: coords.longitude }} />
      </MapView>
    </View>
  );
}
