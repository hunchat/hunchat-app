import React from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Page2 = ({
  handlePageChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 40, width: 0.7 * width }}>
        <Text style={styles.title}>
          A great start.
        </Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>
            This is the first public version of Hunchat. The "Beta"
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>
            Why does that matter?
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>
            Being a first version means that we are still testing things.
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>
            There might be some errors that we are actively trying to solve
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

export default Page2;
