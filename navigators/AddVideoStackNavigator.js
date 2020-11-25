import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AddVideoScreen from '../screens/AddVideoScreen';
import CameraScreen from '../screens/CameraScreen';


const Stack = createStackNavigator();

const AddVideoStack = () => (
  <Stack.Navigator mode="modal" screenOptions={{headerShown: false,gestureEnabled: true}}>
    <Stack.Screen name="AddVideo" component={AddVideoScreen} />
    <Stack.Screen name="Camera" component={CameraScreen} />
  </Stack.Navigator>
)

export default AddVideoStack;
