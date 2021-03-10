import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { STATUS_BAR_HEIGHT } from "../../constants";

const ListPostsHeader = ({ name }) => {
  const navigation = useNavigation();

  const handlePressGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "transparent"]}
        style={styles.gradient}
      />
      <View style={styles.container}>
        <Pressable style={styles.goBack} onPress={handlePressGoBack}>
          <Ionicons name="ios-arrow-back" size={24} color="white" />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
    elevation: 4,
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    elevation: 4,
    zIndex: 100,
    height: STATUS_BAR_HEIGHT + 10,
  },
  goBack: {
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListPostsHeader;
