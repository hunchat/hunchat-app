import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AddPostStack from "./AddPostStack";
import { horizontalAnimation, verticalAnimation } from "./animations";
import AuthStack from "./AuthStack";
import BottomTabs from "./BottomTabs";
import ExploreStack from "./ExploreStack";
import HeaderStack from "./HeaderStack";
import ListStack from "./ListStack";
import OnboardingStack from "./OnboardingStack";
import PostStack from "./PostStack";
import ProfileStack from "./ProfileStack";

const Stack = createStackNavigator();

const AppStack = ({ authRefreshToken, currentUserId, isFirstLaunch }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      {authRefreshToken === null || currentUserId === null ? (
        <>
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </>
      ) : (
        <>
          {isFirstLaunch && (
            <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
          )}
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen
            name="AddPostStack"
            component={AddPostStack}
            options={verticalAnimation}
          />
          <Stack.Screen name="ExploreStack" component={ExploreStack} />
          <Stack.Screen name="ListStack" component={ListStack} />
          <Stack.Screen name="PostStack" component={PostStack} />
          <Stack.Screen name="ProfileStack" component={ProfileStack} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
