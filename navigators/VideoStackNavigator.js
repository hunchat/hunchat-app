import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import ListScreen from '../screens/ListScreen';
import VideoScreen from '../screens/VideoScreen';


const Stack = createSharedElementStackNavigator();

const VideoStack = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: "transparent" },
    }}
    mode="modal"
  >
    <Stack.Screen name="List" component={ListScreen} />
    <Stack.Screen
      name="Video"
      component={VideoScreen}
      sharedElements={(route) => {
        return [route.params.video.id]
      }}
    />
  </Stack.Navigator>
);

export default VideoStack;
