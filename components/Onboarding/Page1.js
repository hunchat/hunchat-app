import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Page1 = ({
  handlePageChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 40, width: 0.7 * width }}>
        <Text style={styles.title}>
          Welcome to Hunchat
        </Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>
            You are now ready to have amazing conversations.
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>
            Thank you for being here :)
          </Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handlePageChange}>
        <Ionicons name="ios-arrow-forward" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "600",
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Page1;
