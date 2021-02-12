import React, { useState, useRef } from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  setAccountInfo,
  setCreateAccountFormEmailAvailableStatus,
  setCreateAccountFormEmailAvailableError,
  emailAvailableThunk,
} from "../../ducks/authSlice";
import { Colors } from "../../styles";

const { width } = Dimensions.get("window");

const CreateAccountForm = ({
  createAccountFormEmailAvailableError,
  createAccountFormEmailAvailableStatus,
  setAccountInfo,
  setCreateAccountFormEmailAvailableStatus,
  setCreateAccountFormEmailAvailableError,
  emailAvailableThunk,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);


  const emailRef = useRef();
  const nameRef = useRef();

  const navigation = useNavigation();

  const nameAvailable = () => {
    if (name.length === 0) {
      setNameError("This field may not be blank.");
    } else {
      setNameError(null);
    }
  };

  const onSubmit = () => {
    setAccountInfo({ email, name });
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>

      {/* Start email */}
      <Pressable
        style={styles.textInputContainer}
        onPress={() => emailRef.current.focus()}
      >
        <MaterialIcons name="email" size={24} color="lightgrey" />
        <TextInput
          ref={emailRef}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
          placeholder="Enter your email"
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          onSubmitEditing={() => nameRef.current.focus()}
          onEndEditing={() => emailAvailableThunk({ email })}
        />
      </Pressable>
      {createAccountFormEmailAvailableStatus === "rejected"
        ? (
            <View style={styles.error}>
              <Text style={styles.errorText}>
                {createAccountFormEmailAvailableError} <MaterialCommunityIcons name="disc" size={14} color="red" />
              </Text>
            </View>
         ) : null
      }
      {/* End email */}

      {/* Start name */}
      <Pressable
        style={styles.textInputContainer}
        onPress={() => nameRef.current.focus()}
      >
        <Ionicons name="ios-person" size={24} color="lightgrey" />
        <TextInput
          ref={nameRef}
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
          placeholder="Enter your name"
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
          textContentType="name"
          onSubmitEditing={() => {
              onSubmit();
              Keyboard.dismiss();
          }}
          onEndEditing={nameAvailable}
        />
      </Pressable>
      {nameError && (
            <View style={styles.error}>
              <Text style={styles.errorText}>
                {nameError} <MaterialCommunityIcons name="disc" size={14} color="red" />
              </Text>
            </View>
      )}
      {/* End name */}

      {/* Start submit button */}
      <Pressable style={styles.submitButton} onPress={onSubmit}>
        <LinearGradient
          colors={["#FF8400", "#FF9D33"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.submitText}>Next</Text>
        </LinearGradient>
      </Pressable>
      {/* End submit button */}

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
  }
});

function mapStateToProps(state) {
  return {
    createAccountFormEmailAvailableError: state.auth.createAccountFormEmailAvailableError,
    createAccountFormEmailAvailableStatus: state.auth.createAccountFormEmailAvailableStatus,
  };
}

const mapDispatchToProps = {
  setAccountInfo,
  setCreateAccountFormEmailAvailableStatus,
  setCreateAccountFormEmailAvailableError,
  emailAvailableThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm);
