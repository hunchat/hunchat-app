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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { SignUpForm } from "../components/SignUp";
import { Colors } from "../styles";

const { width } = Dimensions.get("window");

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={40}
        keyboardOpeningTime={80}
      >
        <Pressable
          onPress={Keyboard.dismiss}
          style={[styles.container, { alignItems: "center" }]}
        >
          <View style={{ marginVertical: 40, width: 0.75 * width }}>
            <Text style={{ color: "white", fontSize: 23, fontWeight: "600" }}>
              Sign up
            </Text>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: "white" }}>
                Join the future of online conversations.
              </Text>
            </View>
          </View>
          <SignUpForm />
        </Pressable>

        <View style={{ height: 50 }} />
      </KeyboardAwareScrollView>
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
});

export default withNavigation(SignUpScreen);
