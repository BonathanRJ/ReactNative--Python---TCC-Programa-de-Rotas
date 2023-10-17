// MapScreen
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';

// API Google Maps
const apiKey = 'AIzaSyDnuTzZzxM5ejsgCln6Y2VvSeQWQlrA3G0';

const MapScreen = ({ route }) => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);
  const Origem = {
    latitude: -22.918713,
    longitude: -43.247075,
  };

  const handleZoomToMarker = () => {
    const targetRegion = {
      latitude: Origem.latitude,
      longitude: Origem.longitude,
      latitudeDelta: 0.0010,
      longitudeDelta: 0.0008,
    };

    mapRef.current?.animateToRegion(targetRegion, 3000);
  };

  useEffect(() => {
    if (route.params && route.params.selectedAddress) {
      const selectedAddress = route.params.selectedAddress;
      
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(selectedAddress)}&key=${apiKey}&types=address`;

      fetch(geocodeUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            mapRef.current?.animateToRegion({
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.0010,
              longitudeDelta: 0.0008,
            }, 3000);

            setSelectedMarker({
              latitude: location.lat,
              longitude: location.lng,
              title: 'Destino',
            });

            // Busca rotas alternativas
            fetchAlternativeRoutes(location.lat, location.lng, apiKey);
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar coordenadas:', error);
        });
    }
  }, [route.params]);

  const fetchAlternativeRoutes = (destLat, destLng, apiKey) => {
    
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${Origem.latitude},${Origem.longitude}&destination=${destLat},${destLng}&key=${apiKey}&alternatives=true`)
      .then((response) => response.json())
      .then((data) => {
        if (data.routes && data.routes.length > 0) {
          setAlternativeRoutes(data.routes.slice(0, 3)); 
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar rotas alternativas:', error);
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: Origem.latitude,
          longitude: Origem.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyle}
      >
        {selectedMarker && (
          <Marker
            coordinate={{
              latitude: selectedMarker.latitude,
              longitude: selectedMarker.longitude,
            }}
            title={selectedMarker.title}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={require('../../assets/destino.png')}
              style={{ width: 19, height: 19 }}
            />
          </Marker>
  )}
  <Marker
    coordinate={{
      latitude: Origem.latitude,
      longitude: Origem.longitude,
    }}
    title="Seu local"
    anchor={{ x: 0.5, y: 0.5 }}
  >
    <Image
      source={require('../../assets/Origem.png')}
      style={{ width: 19, height: 19 }}
    />
  </Marker>

  
  {alternativeRoutes.map((route, index) => {
          let strokeColor = '#cb91ed'; 
          if (index === 0) {
            strokeColor = '#9b0af0'; 
          }

          return (
            <MapViewDirections
              key={index}
              origin={{
                latitude: Origem.latitude,
                longitude: Origem.longitude,
              }}
              destination={{
                latitude: selectedMarker.latitude,
                longitude: selectedMarker.longitude,
              }}
              apikey={apiKey}
              strokeWidth={6}
              strokeColor={strokeColor}
              coordinates={decodePolyline(route?.overview_polyline?.points)}
            />
          );
        })}
      </MapView>
  
      
      <TouchableOpacity
        style={styles.zoomButton}
        onPress={handleZoomToMarker}
      >
        <Image
          source={require('../../assets/location.png')}
          style={{ width: 55, height: 55 }}
        />
      </TouchableOpacity>
  
      <View style={styles.bar} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.textButton}
          onPress={() => navigation.navigate('Search', { apiKey })}
        >
          <Image
            source={require('../../assets/search.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.buttonText}>Para onde?</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.micButton}
          onPress={() => {}}
        >
          <Image
            source={require('../../assets/microphone.png')}
            style={{ width: 20, height: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  };
  
  
  const decodePolyline = (polyline) => {
    const points = [];
    let index = 0,
      lat = 0,
      lng = 0;
  
    while (index < polyline.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
  
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
  
      shift = 0;
      result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
  
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;
  
      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#dfe2eb',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '92%',
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  textButton: {
    backgroundColor: '#dfe2eb',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  micButton: {
    backgroundColor: '#dfe2eb',
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingRight: 10,
    borderRadius: 15,
  },
  bar: {
    backgroundColor: '#6d6f7a',
    height: 6,
    width: 70,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
    borderRadius: 18,
  },
  buttonText: {
    color: '#696969',
    fontSize: 18,
    paddingLeft: 10,
  },
  zoomButton: {
    position: 'absolute',
    top: '83%',
    left: '20%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

const mapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export default MapScreen;