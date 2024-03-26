import {StyleSheet, View} from 'react-native';
import React from 'react';
import GalleryComponent from '../components/molecules/GalleryComponent';

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
      <GalleryComponent />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default GalleryScreen;
