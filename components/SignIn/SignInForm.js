import React from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import * as AppleAuthentication from 'expo-apple-authentication';

import { Colors } from "../../styles";

const { width } = Dimensions.get("window");

const SignInForm = ({}) => {
  const navigation = useNavigation();

  const handlePressCreateNewAccount = () => {
    navigation.navigate("SignUp");
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <Ionicons name="ios-person" size={24} color="lightgrey" />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.textInputContainer}>
        <MaterialIcons name="lock" size={24} color="lightgrey" />
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <Pressable style={styles.submitButton}>
        <LinearGradient
          colors={['#FF8400', '#FF9D33']}
          start={{ x: 0, y: 0}}
          end={{ x: 1, y: 1}}
          style={styles.gradient}>
          <Text style={styles.submitText}>Sign in</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={{ alignItems: "center" }} onPress={handlePressCreateNewAccount}>
        <Text style={styles.newAccount}>Create new account</Text>
      </Pressable>

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
  )
};

const styles = StyleSheet.create({
  container: {

  },
  textInputContainer: {
    marginVertical: 10,
    width: 0.7 * width,
    borderBottomWidth: 3,
    borderBottomColor: "lightgrey",
    paddingVertical: 5,
    flexDirection: "row",
  },
  textInput: {
    marginLeft: 10,
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
    textDecorationLine: "underline",
    color: "lightgrey"
  }
});

export default SignInForm;
