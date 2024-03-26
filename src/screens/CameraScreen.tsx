import React from 'react';
import {View, StyleSheet} from 'react-native';
import CameraComponent from '../components/atoms/CameraComponent';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <CameraComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraScreen;
