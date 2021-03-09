import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { horizontalAnimation, verticalAnimation } from "./animations";
import AuthStack from "./AuthStack";
import BottomTabs from "./BottomTabs";
import OnboardingStack from "./OnboardingStack";
import AddPostScreen from "../screens/AddPostScreen";
import CameraScreen from "../screens/CameraScreen";
import ChatInboxScreen from "../screens/ChatInboxScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ListPostsScreen from "../screens/ListPostsScreen";
import ListScreen from "../screens/ListScreen";
import MenuScreen from "../screens/MenuScreen";
import PostScreen from "../screens/PostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ThreadScreen from "../screens/ThreadScreen";
import VideoEditScreen from "../screens/VideoEditScreen";

const Stack = createStackNavigator();

const AppStack = ({ authRefreshToken, isFirstLaunch }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      {authRefreshToken === null ? (
        <>
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </>
      ) : (
        <>
          {isFirstLaunch && (
            <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
          )}
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="AddPost" component={AddPostScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="ChatInbox" component={ChatInboxScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ListPosts" component={ListPostsScreen} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Thread" component={ThreadScreen} />
          <Stack.Screen name="VideoEdit" component={VideoEditScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
