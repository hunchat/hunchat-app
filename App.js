import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import AppStack from './navigators/AppStackNavigator';
import BottomTabs from './navigators/BottomTabs';
import ExploreStack from './navigators/ExploreStackNavigator';
import FeedStack from './navigators/FeedStackNavigator';
import ListStack from './navigators/ListStackNavigator';
import { navigationRef } from './navigators/RootNavigation';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <AppStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
          <AppStack.Screen name='BottomTabs' component={BottomTabs} />
          <AppStack.Screen name='ExploreStack' component={ExploreStack} />
          <AppStack.Screen name='FeedStack' component={FeedStack} />
          <AppStack.Screen name='ListStack' component={ListStack} />
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  }
})

export default App;
