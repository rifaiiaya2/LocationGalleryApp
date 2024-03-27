import {Text, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';

interface _IChooseImageBtn {
  image: any;
  title: string;
  onPress: () => void;
}
const ChooseImageBtn = ({image, title, onPress}: _IChooseImageBtn) => {
  return (
    <Pressable
      testID="choose-image-btn"
      style={styles.container}
      onPress={onPress}>
      <Image style={styles.image} source={image} />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 85,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 75,
    height: 75,
    opacity: 2,
    zIndex: 0,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 40,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    zIndex: 1,
  },
});

export default ChooseImageBtn;
