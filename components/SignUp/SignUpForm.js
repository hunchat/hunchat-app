import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";

import {
  userCreateThunk,
  usernameAvailableThunk,
  setSignUpFormUsernameAvailableStatus,
  setSignUpFormUsernameAvailableError,
} from "../../ducks/authSlice";
import { Colors } from "../../styles";

const { width } = Dimensions.get("window");

const SignUpForm = ({
  signUpFormSubmittingStatus,
  signUpFormError,
  signUpFormUsernameAvailableStatus,
  signUpFormUsernameAvailableError,
  usernameAvailableThunk,
  userCreateThunk,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [toggleTermsCheckBox, setToggleTermsCheckBox] = useState(false);
  const [termsError, setTermsError] = useState(null);
  const [toggleSubscribeCheckBox, setToggleSubscribeCheckBox] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    if (signUpFormSubmittingStatus === "fulfilled") {
      navigation.navigate("OnboardingStack", {
        screen: "OnboardingAddBioVideo",
      });
    }
  }, [signUpFormSubmittingStatus]);

  const passwordValidate = () => {
    if (password.length < 8) {
      setPasswordError("This password is not valid.");
    } else {
      setPasswordError(null);
    }
  };

  const handlePressSignIn = () => {
    navigation.navigate("SignIn");
  };

  const onPressTerms = () => {
    // Open terms page in browser
  };

  const onSubmit = () => {
    if (!toggleTermsCheckBox) {
      setTermsError("You must accept the terms and conditions to sign up.");
    } else {
      userCreateThunk({
        username: username,
        password: password,
        areTermsAccepted: toggleTermsCheckBox,
        isNewsletterSubscribed: toggleSubscribeCheckBox,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Start username */}
      <Pressable
        style={styles.textInputContainer}
        onPress={() => usernameRef.current.focus()}
      >
        <Ionicons name="ios-person" size={24} color="lightgrey" />
        <TextInput
          ref={usernameRef}
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.textInput}
          placeholder="Choose a username"
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
          textContentType="username"
          onSubmitEditing={() => passwordRef.current.focus()}
          onEndEditing={() => usernameAvailableThunk({ username })}
        />
      </Pressable>
      {signUpFormUsernameAvailableError && (
        <View style={styles.error}>
          <Text style={styles.errorText}>
            {signUpFormUsernameAvailableError}{" "}
            <MaterialCommunityIcons name="disc" size={14} color="red" />
          </Text>
        </View>
      )}
      {/* End username */}

      <View style={styles.passwordInputs}>
        <Pressable
          style={styles.textInputContainer}
          onPress={() => passwordRef.current.focus()}
        >
          <MaterialIcons name="lock" size={24} color="lightgrey" />
          <TextInput
            ref={passwordRef}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            placeholder="Enter a password"
            placeholderTextColor="lightgrey"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
            onEndEditing={passwordValidate}
          />
        </Pressable>
        {passwordError && (
          <View style={styles.error}>
            <Text style={styles.errorText}>
              {passwordError}{" "}
              <MaterialCommunityIcons name="disc" size={14} color="red" />
            </Text>
          </View>
        )}
        <View style={styles.passwordValidation}>
          <Text style={styles.passwordValidationText}>
            Password must include:
          </Text>
          <Text style={styles.passwordValidationText}>8+ characters</Text>
          <Text style={styles.passwordValidationText}>1 number</Text>
          <Text style={styles.passwordValidationText}>1 upper case letter</Text>
          <Text style={styles.passwordValidationText}>1 special character</Text>
        </View>
      </View>

      {/* Start check boxes */}
      <View style={{ marginVertical: 10, width: 0.75 * width }}>
        {/* Start terms and conditions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.checkBoxText}>
            I accept the{" "}
            <Text
              onPress={onPressTerms}
              style={[styles.checkBoxText, { textDecorationLine: "underline" }]}
            >
              terms and conditions
            </Text>
          </Text>
          <CheckBox
            center
            checked={toggleTermsCheckBox}
            onPress={() => setToggleTermsCheckBox(!toggleTermsCheckBox)}
            style={styles.checkbox}
            size={21}
            checkedColor={Colors.primary}
            containerStyle={{ margin: 0, padding: 0 }}
          />
        </View>
        {/* End terms and conditions */}
        {/* Start newsletter */}
        <View
          style={{
            marginTop: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[styles.checkBoxText, { flex: 4 }]}>
            I want to receive important updates about Hunchat
          </Text>
          <CheckBox
            center
            checked={toggleSubscribeCheckBox}
            onPress={() => setToggleSubscribeCheckBox(!toggleSubscribeCheckBox)}
            style={styles.checkbox}
            size={21}
            checkedColor={Colors.primary}
            containerStyle={{ margin: 0, padding: 0 }}
          />
        </View>
        {/* End newsletter */}
      </View>
      {/* End check boxes */}

      {termsError && (
        <View style={styles.error}>
          <Text style={styles.errorText}>
            {termsError}{" "}
            <MaterialCommunityIcons name="disc" size={14} color="red" />
          </Text>
        </View>
      )}

      {/* Start submit button */}
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <LinearGradient
          colors={["#FF8400", "#FF9D33"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {signUpFormSubmittingStatus === "pending" ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.submitText}>Sign up</Text>
          )}
        </LinearGradient>
      </Pressable>
      {/* End submit button */}

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ color: "lightgrey" }}>Already have an account?</Text>
        <Text style={{ color: Colors.primary }} onPress={handlePressSignIn}>
          {" "}
          Sign in
        </Text>
      </View>
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
  passwordInputs: {
    marginTop: 10,
  },
  passwordValidation: {
    marginTop: 5,
    marginBottom: 10,
  },
  passwordValidationText: {
    color: "white",
    fontSize: 12,
  },
  checkBoxText: {
    color: "white",
  },
  checkbox: {
    flex: 1,
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
  error: {
    width: 0.7 * width,
  },
  errorText: {
    textAlign: "center",
    color: "white",
  },
});

function mapStateToProps(state) {
  return {
    signUpFormSubmittingStatus: state.auth.signUpFormSubmittingStatus,
    signUpFormError: state.auth.signUpFormError,
    signUpFormUsernameAvailableStatus:
      state.auth.signUpFormUsernameAvailableStatus,
    signUpFormUsernameAvailableError:
      state.auth.signUpFormUsernameAvailableError,
  };
}

const mapDispatchToProps = {
  userCreateThunk,
  usernameAvailableThunk,
  setSignUpFormUsernameAvailableStatus,
  setSignUpFormUsernameAvailableError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
