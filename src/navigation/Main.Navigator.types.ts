import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
export type MainNavigatorParamList = {
  Welcome: undefined;
  ChooseImageSource: undefined;
  CameraScreen: undefined;
  GalleryScreen: undefined;
  DetailsImage: {
    imageUrl: string;
    date: string;
    location: {longitude: number; latitude: number};
  };
  MapScreen: {
    location: {longitude: number; latitude: number};
  };
};
export interface ImageLocation {
  imagePath: string;
  longitude: number;
  latitude: number;
}
export type DetailsScreenRouteProp = RouteProp<
  MainNavigatorParamList,
  'DetailsImage'
>;
export type MainNavigatorNavigationProp =
  NativeStackNavigationProp<MainNavigatorParamList>;
