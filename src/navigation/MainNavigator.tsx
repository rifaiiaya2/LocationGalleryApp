import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainNavigatorParamList} from './Main.Navigator.types';
import Welcome from '../screens/Welcome';
import ChooseImageSource from '../screens/ChooseImageSource';
import CameraScreen from '../screens/CameraScreen';
import MapScreen from '../screens/MapScreen';
import GalleryScreen from '../screens/GalleryScreen';
import DetailsImage from '../screens/DetailsImage';

const MainNavigator = () => {
  const MainStackNavigator =
    createNativeStackNavigator<MainNavigatorParamList>();
  const screenOptions = {
    contentStyle: {
      backgroundColor: '#f5ebeb',
    },
    headerStyle: {
      backgroundColor: '#f0ebeb',
    },
    headerTintColor: '#2f4f4f',
    headerTitleStyle: {
      fontFamily: 'tahoma',
      fontSize: 17,
    },
  };
  return (
    <MainStackNavigator.Navigator screenOptions={screenOptions}>
      <MainStackNavigator.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="ChooseImageSource"
        component={ChooseImageSource}
        options={{title: 'Image Source'}}
      />
      <MainStackNavigator.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{title: 'Camera'}}
      />
      <MainStackNavigator.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{title: 'Gallery'}}
      />
      <MainStackNavigator.Screen
        name="DetailsImage"
        component={DetailsImage}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen name="MapScreen" component={MapScreen} />
    </MainStackNavigator.Navigator>
  );
};
export default MainNavigator;
