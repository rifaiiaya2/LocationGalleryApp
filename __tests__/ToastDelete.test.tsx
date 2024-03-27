import {ToastAndroid} from 'react-native';
import ToastDelete from '../src/components/atoms/ToastDelete'; // Update the path to match your project structure

jest.mock('react-native', () => ({
  ToastAndroid: {
    showWithGravity: jest.fn(),
  },
}));

describe('ToastDelete component', () => {
  it('calls ToastAndroid.showWithGravity with correct parameters', () => {
    ToastDelete();

    expect(ToastAndroid.showWithGravity).toHaveBeenCalledWith(
      'Are You sure you want to delete this image?',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  });
});
