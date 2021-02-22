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

import { AddBioVideoForm } from "../components/SignUp";
import { Colors } from "../styles";

const { width } = Dimensions.get("window");

class OnboardingAddBioVideoScreen extends React.Component {
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
              <View style={{ marginVertical: 40, width: 0.75 * width }}>
                <Text style={{ color: "white", fontSize: 23, fontWeight: "600" }}>
                  Last step!
                </Text>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ color: "white" }}>
                    Hunchat is all about video and conversations.
                  </Text>
                </View>
              </View>
              <AddBioVideoForm />
            </Pressable>
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
});

export default withNavigation(OnboardingAddBioVideoScreen);
