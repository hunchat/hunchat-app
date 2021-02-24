import React from "react";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { View, StyleSheet, Text, Pressable } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../styles";

const MenuScreen = ({ navigation }) => {
  const handlePressGoBack = () => {
    navigation.goBack();
  };

  const handlePressEditProfile = () => {
    navigation.navigate("ProfileStack", { screen: "EditProfile" });
  };

  const handlePressInvite = () => {};

  return (
    <View style={styles.container}>
      {/* Start header */}
      <View style={styles.header}>
        <Pressable style={styles.goBack} onPress={handlePressGoBack}>
          <Ionicons name="ios-arrow-back" size={24} color="white" />
        </Pressable>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>Menu</Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      {/* Start header */}

      {/* Start options */}
      <View style={styles.options}>
        <Pressable style={styles.option} onPress={handlePressEditProfile}>
          <MaterialCommunityIcons name="pencil" size={30} color="white" />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "white", fontSize: 18 }}>Edit profile</Text>
          </View>
        </Pressable>
        <Pressable style={styles.option}>
          <Ionicons name="ios-settings-sharp" size={30} color="white" />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "white", fontSize: 18 }}>Settings</Text>
          </View>
        </Pressable>
        <Pressable style={styles.option}>
          <MaterialIcons name="videocam" size={30} color="white" />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: "white", fontSize: 18 }}>About Hunchat</Text>
          </View>
        </Pressable>
      </View>
      {/* End options */}

      <View style={{ marginTop: 30 }}>
        <Pressable style={styles.button} onPress={handlePressInvite}>
          <LinearGradient
            colors={["#FF8400", "#FF9D33"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              Invite interesting people
            </Text>
          </LinearGradient>
        </Pressable>
        <Text style={{ color: "white", textAlign: "center" }}>
          You can invite up to 5 people
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
    alignItems: "center",
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goBack: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
  options: {
    marginVertical: 50,
  },
  option: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
    shadowColor: "#AE5B02",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 11,
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default withNavigation(MenuScreen);
