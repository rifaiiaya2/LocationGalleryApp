import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import ChooseImageBtn from '../components/atoms/ChooseImageBtn';
import {useNavigation} from '@react-navigation/native';
import {MainNavigatorNavigationProp} from '../navigation/Main.Navigator.types';
import camera from '../assets/Images/camera.png';
import galleryImg from '../assets/Images/gallery.png';
import background from '../assets/Images/backgImage.jpeg';
const ChooseImageSource = () => {
  const navigation = useNavigation<MainNavigatorNavigationProp>();
  const handleGallery = () => {
    navigation.navigate('GalleryScreen');
  };
  const handleCameraClick = () => {
    navigation.navigate('CameraScreen');
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.Container}>
      <ChooseImageBtn
        image={camera}
        title="Take a Photo"
        onPress={handleCameraClick}
      />
      <ChooseImageBtn
        image={galleryImg}
        title="Photo Gallery"
        onPress={handleGallery}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChooseImageSource;
