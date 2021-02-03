import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export const HEADER_HEIGHT = 50;

function Header({ title }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.navigation}>
        <Icon name="person-outline" color="white" size={35} />
        <Icon
          name="email-outline"
          type="material-community"
          color="white"
          size={35}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: HEADER_HEIGHT,
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: "black",
    elevation: 4,
    zIndex: 100,
  },
  titleContainer: {
    flex: 3,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  navigation: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default Header;
