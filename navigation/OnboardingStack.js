import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { horizontalAnimation } from "./animations";
import CameraScreen from "../screens/CameraScreen";
import OnboardingAddBioVideoScreen from "../screens/OnboardingAddBioVideoScreen";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createStackNavigator();

const OnboardingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
    <Stack.Screen name="OnboardingAddBioVideo" component={OnboardingAddBioVideoScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen
      name="Camera"
      component={CameraScreen}
      options={horizontalAnimation}
    />
  </Stack.Navigator>
);

export default OnboardingStack;
