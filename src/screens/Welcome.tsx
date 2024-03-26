import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AnimationWelcome from '../assets/Animation/WelcomeAnimation.json';
import {MainNavigatorNavigationProp} from '../navigation/Main.Navigator.types';

const Welcome = () => {
  const navigation = useNavigation<MainNavigatorNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('ChooseImageSource');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        Welcome to Location-Based Photo Gallery App
      </Text>
      <LottieView
        source={AnimationWelcome}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  textTitle: {
    padding: 18,
    margin: 15,
    lineHeight: 38,
    textAlign: 'center',
    color: '#ed0707',
    fontWeight: '600',
    fontSize: 26,
    fontStyle: 'italic',
  },
  lottie: {
    flex: 1,
    width: '90%',
    aspectRatio: 0.8,
  },
});

export default Welcome;
