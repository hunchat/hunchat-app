import React from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from "react-native";

import { SignUpForm } from "../components/SignUp";
import { Colors } from "../styles";

const { width } = Dimensions.get("window");

class SignUpScreen extends React.Component {
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
            <View style={{ marginVertical: 40, width: 0.75 * width }}>
              <Text style={{ color: "white", fontSize: 23, fontWeight: "600"}}>Sign up</Text>
              <View style={{ marginTop: 5 }}>
                <Text style={{ color: "white"}}>
                  Join the future of online conversations.
                </Text>
              </View>
            </View>
            <SignUpForm
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

export default withNavigation(SignUpScreen);
