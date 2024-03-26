import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Linking,
  Text,
  SafeAreaView,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {MainNavigatorNavigationProp} from '../../navigation/Main.Navigator.types';
import {ImageLocation} from '../../navigation/Main.Navigator.types';
import {postImageandLocationToAPI} from '../../api/PostToMockAPI';
import Icon from 'react-native-vector-icons/AntDesign';

interface ILocation {
  longitude: number;
  latitude: number;
}
interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}
interface GeolocationPositionError {
  code: number;
  message: string;
}

const CameraComponent = () => {
  const navigation = useNavigation<MainNavigatorNavigationProp>();
  const {requestPermission, hasPermission} = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const [isCameraVisible, setIsCameraVisible] = useState(true);
  const [capturedImage, setCapturedImage] = useState<null | string>(null);
  const [location, setLocation] = useState<ILocation | null>(null);
  const saveImageAndLocationRef =
    useRef<(imageLocation: ImageLocation) => Promise<void>>();

  useEffect(() => {
    saveImageAndLocationRef.current = saveImageAndLocation;
  }, []);

  useEffect(() => {
    if (capturedImage && location) {
      if (saveImageAndLocationRef.current) {
        saveImageAndLocationRef.current({
          imagePath: capturedImage,
          longitude: location.longitude,
          latitude: location.latitude,
        });
      }
    }
  }, [capturedImage, location]);

  const openCamera = async () => {
    const isAccessGranted = await requestPermission();

    if (!isAccessGranted) {
      Alert.alert('Permission required', 'Open settings to grant permission', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Open settings',
          style: 'default',
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]);
      return;
    }

    setIsCameraVisible(true);
  };

  const closeCamera = () => {
    setIsCameraVisible(false);
    navigation.goBack();
  };

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto();
      const photoPath = `file://${photo!.path}`;
      console.log('Captured Image Path:', photoPath);
      setCapturedImage(photoPath);
      getCurrentLocation();
      //closeCamera();
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const {longitude, latitude} = position.coords;
        console.log('Location:', longitude, latitude);
        setLocation({longitude, latitude});
      },
      (error: GeolocationPositionError) => {
        console.error('Error getting current location:', error);
        Alert.alert('Error', 'Failed to get current location');
      },
      {enableHighAccuracy: true},
    );
  };

  const saveImageAndLocation = async ({
    imagePath,
    longitude,
    latitude,
  }: ImageLocation) => {
    try {
      await AsyncStorage.setItem('capturedImage', imagePath);
      console.log('Image saved to AsyncStorage:', imagePath);
      await postImageandLocationToAPI(imagePath, longitude, latitude);
    } catch (error) {
      console.error('Error saving image to AsyncStorage:', error);
    }
  };

  if (!hasPermission) {
    return <Text>No permission</Text>;
  }
  if (!device) {
    return <Text>Camera device not found</Text>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.cameraContainer}>
        {isCameraVisible && (
          <Camera
            device={device}
            isActive={true}
            ref={cameraRef}
            photo={true}
            style={StyleSheet.absoluteFill}
          />
        )}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={takePhoto}
            android_ripple={{color: 'rgba(0, 0, 0, 0.1)'}}>
            <Icon name="camera" size={34} color="white" />
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={closeCamera}
            android_ripple={{color: 'rgba(0, 0, 0, 0.1)'}}>
            <Icon name="close" size={34} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraComponent;
