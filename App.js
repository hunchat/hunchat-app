import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, StatusBar, Platform, Linking } from "react-native";
import Dialog from "react-native-dialog";

import { AppStack, navigationRef } from "./navigation";

function App() {
  const [visible, setVisible] = useState(
    Platform.OS === 'ios' && Platform.Version === '14.0' ? true : false
  );

  const onPressUpdate = () => {
    Linking.openURL("App-prefs:root=General");
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef}>

      {/* Alert of problem with iOS 14.0 */}
      {/* iOS 14.0 causes a break on expo-av.Video. See https://github.com/expo/expo/issues/10249 */}
      <Dialog.Container visible={visible}>
        <Dialog.Title>Please update your software</Dialog.Title>
        <Dialog.Description>
          You are using iOS 14.0. Hunchat doesn't like this version. Make Hunchat happy and update.
        </Dialog.Description>
        <Dialog.Button label="Update" onPress={onPressUpdate} />
      </Dialog.Container>

        <AppStack />
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
