import {ToastAndroid} from 'react-native';

const ToastDelete = () => {
  ToastAndroid.showWithGravity(
    'Are You sure you want to delete this image?',
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
  );
  return null;
};

export default ToastDelete;
