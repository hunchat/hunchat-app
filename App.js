import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './navigators/AppStackNavigator';
import BottomTabs from './navigators/BottomTabs';
import FeedStack from './navigators/FeedStackNavigator';
import { navigationRef } from './navigators/RootNavigation';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
        <AppStack.Screen name='BottomTabs' component={BottomTabs} />
        <AppStack.Screen name='FeedStack' component={FeedStack} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
