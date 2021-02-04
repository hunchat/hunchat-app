import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { horizontalAnimation } from "./animations";
import AddVideoScreen from "../screens/AddVideoScreen";
import CameraScreen from "../screens/CameraScreen";
import VideoEditScreen from "../screens/VideoEditScreen";

const Stack = createStackNavigator();

const AddVideoStack = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{ headerShown: false, gestureEnabled: false }}
  >
    <Stack.Screen name="AddVideo" component={AddVideoScreen}/>
    <Stack.Screen name="Camera" component={CameraScreen} options={horizontalAnimation}/>
    <Stack.Screen name="VideoEdit" component={VideoEditScreen} options={horizontalAnimation}/>
  </Stack.Navigator>
);

export default AddVideoStack;
