import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ExploreScreen from "../screens/ExploreScreen";
import FeedScreen from "../screens/FeedScreen";

const Stack = createStackNavigator();

const ExploreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
    <Stack.Screen name="Explore" component={ExploreScreen} />
    <Stack.Screen name="Feed" component={FeedScreen} />
  </Stack.Navigator>
);

export default ExploreStack;
