import React from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from "react-native";

import { SignInForm } from "../components/SignIn";
import { Colors } from "../styles";

const { width } = Dimensions.get("window");

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={{ flex: 1 }}>
          <Pressable
            onPress={Keyboard.dismiss}
            style={[styles.container, { alignItems: "center"}]}
          >
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
            <SignInForm
            />
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  logo: {
    width: 0.6 * width,
    resizeMode: "contain",
  }
});

export default withNavigation(SignInScreen);
