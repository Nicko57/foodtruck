import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import MapView, { Marker, Callout } from 'react-native-maps';
import { View } from '../themes/Themed';
import InfoWindow from './InfoWindow';

import foodIcons from '../../../assets/mapIcons.js';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.9990674;
const LONGITUDE = -90.0852767;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Map({
  provider,
  truckMarkers,
  setTruckMarkers,
  search,
}) {
  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const getAllTrucks = () => {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/`)
      .then((response) => {
        const { data } = response;
        const filteredMarkers = data.filter((truck: Object) => truck.food_genre === search);
        if (filteredMarkers.length) {
          setTruckMarkers(filteredMarkers);
        } else {
          setTruckMarkers(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllTrucks();
  }, [search]);

  const searchTrucks = () => {
    if (search.length) {
    axios
      .get(`${process.env.EXPO_LocalLan}/truck/search/${search}`)
      .then((response) => {
        const { data } = response;
        setTruckMarkers([]);
        setTruckMarkers(data);
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      getAllTrucks();
    }
  };
  useEffect(() => {
    searchTrucks();
  }, [search]);

  return (
    <View style={styles.container}>
      <MapView
        provider={provider}
        style={styles.map}
        initialRegion={region}
        zoomTapEnabled={false}
      >
        {truckMarkers
          && (truckMarkers.filter(
            (truck) => truck.full_name === search || truck.food_genre === search,
          ).length
            ? truckMarkers.filter(
              (truck) => truck.full_name === search || truck.food_genre === search,
            )
            : truckMarkers
          ).map((currentTruck) => (
            <View key={currentTruck.id}>
              <Marker
                coordinate={{
                  latitude: +currentTruck.latitude,
                  longitude: +currentTruck.longitude,
                }}
                image={foodIcons[currentTruck.food_genre]}
              >
                <Callout style={styles.customView}>
                  <View>
                    <InfoWindow currentTruck={currentTruck} />
                  </View>
                </Callout>
              </Marker>
            </View>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  customView: {
    width: 280,
    height: 140,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(70,70,70,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
