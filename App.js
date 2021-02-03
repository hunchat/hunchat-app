import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import {
  AddVideoStack,
  verticalAnimation,
  AppStack,
  BottomTabs,
  ExploreStack,
  FeedStack,
  ListStack,
  VideoStack,
  navigationRef,
} from "./navigation";

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <AppStack.Navigator
          screenOptions={{ headerShown: false, gestureEnabled: true }}
        >
          <AppStack.Screen name="BottomTabs" component={BottomTabs} />
          <AppStack.Screen name="AddVideoStack" component={AddVideoStack} options={verticalAnimation}/>
          <AppStack.Screen name="ExploreStack" component={ExploreStack} />
          <AppStack.Screen name="FeedStack" component={FeedStack} />
          <AppStack.Screen name="ListStack" component={ListStack} />
          <AppStack.Screen name="VideoStack" component={VideoStack} />
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default App;
