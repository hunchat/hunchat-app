import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ListPostsScreen from "../screens/ListPostsScreen";
import ListScreen from "../screens/ListScreen";
import ListsScreen from "../screens/ListsScreen";

const Stack = createStackNavigator();

const ListStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
    <Stack.Screen name="List" component={ListScreen} />
    <Stack.Screen name="Lists" component={ListsScreen} />
    <Stack.Screen name="ListPosts" component={ListPostsScreen} />
  </Stack.Navigator>
);

export default ListStack;
