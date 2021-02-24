import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const ThreadHeader = ({ currentIndex, threadLength }) => {
  const navigation = useNavigation();

  const handlePressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.goBack} onPress={handlePressGoBack}>
        <Ionicons name="ios-arrow-back" size={24} color="white" />
      </Pressable>
      <View style={styles.index}>
        <Text style={styles.indexText}>
          {currentIndex + 1}/{threadLength}
        </Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    elevation: 4,
    zIndex: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goBack: {
    flex: 1,
  },
  index: {
    flex: 1,
  },
  indexText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});

export default ThreadHeader;
