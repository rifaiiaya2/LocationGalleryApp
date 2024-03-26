import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  MainNavigatorParamList,
  MainNavigatorNavigationProp,
} from '../navigation/Main.Navigator.types';
import {RouteProp, useNavigation} from '@react-navigation/native';
type DetailsScreenRouteProp = RouteProp<MainNavigatorParamList, 'DetailsImage'>;

type Props = {
  route: DetailsScreenRouteProp;
};
const {width} = Dimensions.get('window');
const imageSize = width / 1 - 20;
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
};

const DetailsImage = ({route}: Props) => {
  const navigation = useNavigation<MainNavigatorNavigationProp>();
  const handleShowLocation = () => {
    navigation.navigate('MapScreen', {location});
  };
  const {imageUrl, date, location} = route.params;
  const FormatDate = formatDate(date);
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.date}>
        <Text style={styles.label}>Date:</Text> {FormatDate}
      </Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationVarTitle}>Location Variables:</Text>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Latitude:</Text>
              <Text style={styles.locationVar}>{location.latitude}</Text>
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Longitude:</Text>
              <Text style={styles.locationVar}>{location.longitude}</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.LocationBtnView}>
        <Pressable onPress={handleShowLocation} style={styles.LocationBtn}>
          <Text style={styles.BtnTitleLoc}>Show Location on Map</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: imageSize,
    height: 350,
    resizeMode: 'cover',
  },
  date: {
    fontSize: 17,
    marginTop: 20,
    fontWeight: '300',
    fontStyle: 'italic',
    color: '#252236',
  },
  label: {
    fontWeight: '400',
    color: '#5e4545',
    textDecorationLine: 'underline',
    marginRight: 3,
  },
  locationContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingTop: 40,
  },
  locationVarTitle: {
    color: '#5e4545',
    fontSize: 19,
    fontWeight: '400',
    lineHeight: 50,
    padding: 14,
    textDecorationLine: 'underline',
  },
  locationTextContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  locationVar: {
    color: '#000',
    fontSize: 17,
    fontWeight: '300',
    lineHeight: 50,
  },
  locationLabel: {
    fontWeight: '500',
    marginRight: 7,
    fontSize: 16,
    color: '#f50a0a',
  },
  LocationBtnView: {
    padding: 30,
    margin: 15,
    width: 350,
    height: 100,
  },
  LocationBtn: {
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#f2e6e6',
    justifyContent: 'center',
    height: 45,
  },
  BtnTitleLoc: {
    fontSize: 20,
    fontWeight: '400',
  },
});
export default DetailsImage;
