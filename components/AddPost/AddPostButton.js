import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../../styles";

const { width } = Dimensions.get("window");

const AddVideoButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Camera", { action: "addPost" });
  };
  
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <LinearGradient
        colors={["#FF8400", "#FF9D33"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <MaterialIcons name="videocam" size={40} color="white" />
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 0.5 * width - 46,
    shadowColor: "#AE5B02",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.63,
    shadowRadius: 5,

    elevation: 11,
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
});

export default AddVideoButton;
