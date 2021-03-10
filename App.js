import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  StatusBar,
  Platform,
  Linking,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";
import Dialog from "react-native-dialog";
import { decode, encode } from "base-64";

import checkIfFirstLaunch from "./utils/checkIfFirstLaunch";
import loadAuthData from "./utils/loadAuthData";
import { AppStack, navigationRef } from "./navigation";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLaunch: false,
      appIsReady: false,
      visible:
        Platform.OS === "ios" && Platform.Version === "14.0" ? true : false,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle("light-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authRefreshToken !== prevProps.authRefreshToken) {
      setTimeout(function () {
        SplashScreen.hideAsync()
      }, 500); // 500 ms delay to allow AppStack.Navigator to mount screens
    }
  }

  /**
   * Method that serves to load resources and make API calls
   */
  prepareResources = async () => {
    const authData = await loadAuthData();
    const isFirstLaunch = await checkIfFirstLaunch();
    this.setState({ isFirstLaunch });
    return Promise.all([authData, isFirstLaunch])
  };

  onPressUpdate = () => {
    Linking.openURL("App-prefs:root=General");
  };

  render() {
    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.prepareResources}
          onFinish={() => this.setState({ appIsReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    return (
      <NavigationContainer ref={navigationRef}>
        {/* Alert of problem with iOS 14.0 */}
        {/* iOS 14.0 causes a break on expo-av.Video. See https://github.com/expo/expo/issues/10249 */}
        <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>Please update your software</Dialog.Title>
          <Dialog.Description>
            You are using iOS 14.0. Hunchat doesn't like this version. Make
            Hunchat happy and update.
          </Dialog.Description>
          <Dialog.Button label="Update" onPress={this.onPressUpdate} />
        </Dialog.Container>

        <AppStack
          authRefreshToken={this.props.authRefreshToken}
          isFirstLaunch={this.state.isFirstLaunch}
        />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  authRefreshToken: state.auth.refreshToken,
});

export default connect(mapStateToProps)(App);
