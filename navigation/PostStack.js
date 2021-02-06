import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import ListScreen from "../screens/ListScreen";
import PostScreen from "../screens/PostScreen";

const Stack = createSharedElementStackNavigator();

const PostStack = () => (
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
      name="Post"
      component={PostScreen}
      sharedElements={(route) => {
        return [route.params.post.id];
      }}
    />
  </Stack.Navigator>
);

export default PostStack;
