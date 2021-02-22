import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { horizontalAnimation } from "./animations";
import ListScreen from "../screens/ListScreen";
import PostScreen from "../screens/PostScreen";
import ThreadScreen from "../screens/ThreadScreen";

const Stack = createSharedElementStackNavigator();

const PostStack = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: "transparent" },
    }}
    mode="modal"
  >
    <Stack.Screen name="List" component={ListScreen} />
    <Stack.Screen
      name="Post"
      component={PostScreen}
      sharedElements={(route) => {
        return [route.params.post.id];
      }}
    />
    <Stack.Screen
      name="Thread"
      component={ThreadScreen}
      options={horizontalAnimation}
    />
  </Stack.Navigator>
);

export default PostStack;
