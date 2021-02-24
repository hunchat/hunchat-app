import React from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Image,
  Text,
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
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "position" : "padding"}
            style={{ flex: 1 }}
          >
            <Pressable
              onPress={Keyboard.dismiss}
              style={[styles.container, { alignItems: "center" }]}
            >
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
              />
              <SignInForm />
            </Pressable>

            {/* Start forgot password */}
            <Pressable
              style={{
                marginTop: 60,
              }}
            >
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </Pressable>
            {/* End forgot password */}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
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
  },
  forgotPassword: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "lightgrey",
  },
});

export default withNavigation(SignInScreen);
