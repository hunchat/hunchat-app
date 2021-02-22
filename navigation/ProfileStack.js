import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { horizontalAnimation } from "./animations";
import CameraScreen from "../screens/CameraScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MenuScreen from "../screens/MenuScreen";

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen
      name="Camera"
      component={CameraScreen}
      options={horizontalAnimation}
    />
  </Stack.Navigator>
);

export default ProfileStack;
