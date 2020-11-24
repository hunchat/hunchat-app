import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import AppStack from './navigators/AppStackNavigator';
import BottomTabs from './navigators/BottomTabs';
import FeedStack from './navigators/FeedStackNavigator';
import { navigationRef } from './navigators/RootNavigation';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <AppStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
          <AppStack.Screen name='BottomTabs' component={BottomTabs} />
          <AppStack.Screen name='FeedStack' component={FeedStack} />
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ,
  }
})

export default App;
