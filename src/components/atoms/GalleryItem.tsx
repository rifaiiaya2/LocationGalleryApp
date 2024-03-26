import {View, Animated, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

interface IGalleryItemProps {
  imageUrl: string;
  onPress: () => void;
  onDelete: () => void;
}
const GalleryItem = ({imageUrl, onPress, onDelete}: IGalleryItemProps) => {
  const renderRightActions = (
    dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragAnimatedValue.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-5, 0, 0, 1],
    });
    return (
      <RectButton style={styles.rightAction} onPress={onDelete}>
        <Animated.Text
          style={[
            styles.actionIconContainer,
            {
              transform: [{translateX: trans}],
            },
          ]}>
          <Icon name="delete" size={28} color="#f7e9ea" />
        </Animated.Text>
      </RectButton>
    );
  };
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <Pressable onLongPress={onPress}>
          <View style={styles.ImageContainer}>
            <Image source={{uri: imageUrl}} style={styles.image} />
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  ImageContainer: {
    margin: 3,
  },
  image: {
    width: 200,
    height: 200,
  },
  rightAction: {
    backgroundColor: '#f70519',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
  },
  actionIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GalleryItem;
