# Location-Based Photo Gallery App

## Description

This React Native application allows users to capture photos using the device camera, organize them based on their location, and view them in a gallery format. Users can interact with the photos by swiping to delete or long-pressing to view details. The app integrates with the device's location services to associate each photo with its location and displays a map view with markers for each photo location. It also includes features like fetching photos from a backend service, storing them locally, implementing pull-to-refresh, and pagination for seamless navigation.

## Features

- Capture photos using the device camera.
- Select photos from the device library.
- Display photos in a scrollable gallery using FlatList.
- Implement touch gestures for interaction (swipe to delete, long-press to view details).
- Utilize location services to associate photos with their location.
- Display a map view with markers for each photo location.
- Fetch photos from a backend service using Axios.
- Store photos locally on the device.
- Implement pull-to-refresh for gallery updates.
- Pagination for loading more photos as the user scrolls.
- Enhance user experience with animations using the Animated API.

## Technologies Used:

- React Native CLI
- Axios
- React Navigation
- React Native Gesture Handler
- AsyncStorage
- Mock API

## Installation

To run this app locally, follow these steps:

1. Clone this repository to your local machine:

- https://github.com/rifaiiaya2/LocationGalleryApp.git

2. Navigate to the project directory.

- cd LocationGalleryApp

3. Install dependencies using your package manager

- npm install`or`yarn install`

  4. Ensure you have the necessary development environment set up for React Native

  - follow the official React Native [documentation](https://reactnative.dev/docs/environment-setup)

  5. Run the app on an emulator/simulator or a physical device - npm run-android`or`npm run-ios
