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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { CreateAccountForm } from "../components/SignUp";
import { Colors } from "../styles";

const { width } = Dimensions.get("window");

class CreateAccountScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressGoBack = () => {
    this.props.navigation.goBack();
  };

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
          {/* Start header */}
          <View style={styles.header}>
            <Pressable style={styles.goBack} onPress={this.onPressGoBack}>
              <Ionicons name="ios-arrow-back" size={24} color="white" />
            </Pressable>
          </View>
          {/* End header */}

          <View style={{ marginVertical: 40, width: 0.75 * width }}>
            <Text style={{ color: "white", fontSize: 23, fontWeight: "600" }}>
              Create your account
            </Text>
          </View>
          <CreateAccountForm />
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
  header: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  goBack: {},
  logo: {
    width: 0.6 * width,
    resizeMode: "contain",
  },
});

export default withNavigation(CreateAccountScreen);
