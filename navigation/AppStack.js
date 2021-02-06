import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddPostStack from "./AddPostStack";
import { horizontalAnimation, verticalAnimation } from "./animations";
import AuthStack from "./AuthStack";
import BottomTabs from "./BottomTabs";
import ExploreStack from "./ExploreStack";
import FeedStack from "./FeedStack";
import HeaderStack from "./HeaderStack";
import ListStack from "./ListStack";
import PostStack from "./PostStack";
import { store } from "../store";


const Stack = createStackNavigator();

const AppStack = () => {
  const state = store.getState();

  const authRefreshToken = state.auth.refreshToken;
  const currentUserId = state.users.currentUserId;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      {authRefreshToken !== null ||
      currentUserId !== null ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="AddPostStack" component={AddPostStack} options={verticalAnimation}/>
        <Stack.Screen name="ExploreStack" component={ExploreStack} />
        <Stack.Screen name="FeedStack" component={FeedStack} />
        <Stack.Screen name="ListStack" component={ListStack} />
        <Stack.Screen name="PostStack" component={PostStack} />
        </>
      )}
    </Stack.Navigator>
  )
};

export default AppStack;
