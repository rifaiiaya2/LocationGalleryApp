import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ChooseImageBtn from '../src/components/atoms/ChooseImageBtn';

describe('ChooseImageBtn component', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <ChooseImageBtn
        image={require('../src/assets/Images/camera.png')}
        title="Choose Image"
        onPress={() => {}}
      />,
    );

    const titleText = getByText('Choose Image');
    expect(titleText).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <ChooseImageBtn
        image={require('../src/assets/Images/gallery.png')}
        title="Choose Image"
        onPress={onPressMock}
      />,
    );

    const button = getByTestId('choose-image-btn');
    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalled();
  });
});
