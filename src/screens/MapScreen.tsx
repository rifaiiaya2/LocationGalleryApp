import {View, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {MainNavigatorParamList} from '../navigation/Main.Navigator.types';
import {RouteProp} from '@react-navigation/native';
type MapScreenRouteProp = RouteProp<MainNavigatorParamList, 'MapScreen'>;

interface MapScreenProps {
  route: MapScreenRouteProp;
}

const MapScreen = ({route}: MapScreenProps) => {
  const {location} = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          pinColor="red"
          title="Photo Location"
          description="This is where the photo was taken"
        />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
export default MapScreen;
