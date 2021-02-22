import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  Text,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import * as AppleAuthentication from 'expo-apple-authentication';

import { tokenObtainThunk } from "../../ducks/authSlice";
import { Colors } from "../../styles";

const { width } = Dimensions.get("window");

const SignInForm = ({
  signInFormError,
  signInFormSubmittingStatus,
  tokenObtainThunk,
}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigation = useNavigation();

  const onSubmit = () => {
    tokenObtainThunk({ username, password });
  };

  const handlePressCreateNewAccount = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <Ionicons name="ios-person" size={24} color="lightgrey" />
        <TextInput
          ref={usernameRef}
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.textInput}
          placeholder="Enter your username"
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
          onSubmitEditing={() => {
              passwordRef.current.focus();
          }}
        />
      </View>
      <View style={styles.textInputContainer}>
        <MaterialIcons name="lock" size={24} color="lightgrey" />
        <TextInput
          ref={passwordRef}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
          placeholder="Enter your password"
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={true}
          onSubmitEditing={() => {
              onSubmit();
              Keyboard.dismiss();
          }}
        />
      </View>

      <Pressable
        style={styles.submitButton}
        onPress={onSubmit}
      >
        <LinearGradient
          colors={["#FF8400", "#FF9D33"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {signInFormSubmittingStatus === "pending"
            ? <ActivityIndicator size="small" color="white" />
            : <Text style={styles.submitText}>Sign in</Text>
          }
        </LinearGradient>
      </Pressable>

      <Pressable
        style={{ alignItems: "center" }}
        onPress={handlePressCreateNewAccount}
      >
        <Text style={styles.newAccount}>Create new account</Text>
      </Pressable>

      {signInFormSubmittingStatus === "rejected"
        ? (
            <View style={styles.error}>
              <Text style={styles.errorText}>
                {signInFormError} <MaterialCommunityIcons name="disc" size={14} color="red" />
              </Text>
            </View>
         ) : null
      }

      {/* Alternative Authentication */}
      {/*<View style={{ marginTop: 40, alignItems: "center" }}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={10}
          style={{ width: 200, height: 35 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              // signed in
            } catch (e) {
              if (e.code === 'ERR_CANCELED') {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textInputContainer: {
    marginVertical: 10,
    width: 0.7 * width,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
    paddingVertical: 5,
    flexDirection: "row",
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
    color: "white",
  },
  submitButton: {
    marginTop: 15,
    marginBottom: 10,
    shadowColor: "#AE5B02",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 7,

    elevation: 11,
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  newAccount: {
    color: Colors.primary,
  },
  error: {
    marginTop: 15,
    width: 0.6 * width,
  },
  errorText: {
    textAlign: "center",
    color: "white",
  }
});

function mapStateToProps(state) {
  return {
    signInFormError: state.auth.signInFormError,
    signInFormSubmittingStatus: state.auth.signInFormSubmittingStatus,
  };
}

const mapDispatchToProps = {
  tokenObtainThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
