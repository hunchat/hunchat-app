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

import { Colors } from "../../styles";

const { width } = Dimensions.get("window");

const SignInForm = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <Ionicons name="ios-person" size={24} color="lightgrey" />
        <TextInput
          style={styles.textInput}
          placeholder="Enter an email"
          placeholderTextColor="lightgrey"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.passwordInputs}>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="lock" size={24} color="lightgrey" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter a password"
            placeholderTextColor="lightgrey"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="lock" size={24} color="lightgrey" />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            placeholderTextColor="lightgrey"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <Pressable style={styles.submitButton}>
        <LinearGradient
          colors={['#FF8400', '#FF9D33']}
          start={{ x: 0, y: 0}}
          end={{ x: 1, y: 1}}
          style={styles.gradient}>
          <Text style={styles.submitText}>Sign up</Text>
        </LinearGradient>
      </Pressable>
      <Pressable style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ color: "lightgrey" }}>Already have an account?</Text>
        <Text style={{ marginLeft: 3, color: Colors.primary }}>Sign in</Text>
      </Pressable>
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
  passwordInputs: {
    marginTop: 10,
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
});

export default SignInForm;
