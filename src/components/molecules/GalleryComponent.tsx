import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GalleryItem from '../atoms/GalleryItem';
import {useNavigation} from '@react-navigation/native';
import {MainNavigatorNavigationProp} from '../../navigation/Main.Navigator.types';
import ToastDelete from '../atoms/ToastDelete';
import {Alert} from 'react-native';

interface IGalleryItem {
  id: string;
  imageUrl: string;
  date: string;
  location: {longitude: number; latitude: number};
}
const GalleryComponent = () => {
  const navigation = useNavigation<MainNavigatorNavigationProp>();
  useEffect(() => {
    FetchImages();
  }, []);

  const LongPressToDetailImg = (
    imageUrl: string,
    date: string,
    location: {longitude: number; latitude: number},
  ) => {
    navigation.navigate('DetailsImage', {imageUrl, date, location});
  };
  const [images, setImages] = useState<IGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const FetchImages = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get<IGalleryItem[]>(
        `https://66002202df565f1a6145d950.mockapi.io/images/image?page=${page}&limit=${limit}`,
      );
      if (page === 1) {
        setImages(response.data);
      } else {
        setImages(prevImages => [...prevImages, ...response.data]);
      }
      setPage(prevPage => prevPage + 1);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    FetchImages().then(() => setRefreshing(false));
  };
  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              <ToastDelete />;
              await axios.delete(
                `https://66002202df565f1a6145d950.mockapi.io/images/image/${id}`,
              );
              const updatedImages = images.filter(item => item.id !== id);
              setImages(updatedImages);
            } catch (error) {
              console.error('Error deleting image:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
  const renderItem = ({item}: {item: IGalleryItem}) => (
    <GalleryItem
      imageUrl={item.imageUrl}
      onPress={() => {
        LongPressToDetailImg(item.imageUrl, item.date, item.location);
      }}
      onDelete={() => handleDelete(item.id)}
    />
  );
  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      //FetchImages().then(() => setLoadingMore(false));
      FetchImages(page);
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      {loadingMore && (
        <ActivityIndicator size="large" color="red" style={{flex: 1}} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  imageContainer: {
    margin: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default GalleryComponent;
