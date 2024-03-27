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
    margin: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 90,
    height: 90,
    opacity: 1,
    zIndex: 0,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    lineHeight: 40,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    zIndex: 1,
  },
});

export default ChooseImageBtn;
