import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get("window");

const CameraHeader = ({}) => {
  const navigation = useNavigation();

  const handlePressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.goBack} onPress={handlePressGoBack}>
        <Ionicons name="ios-arrow-back" size={24} color="white" />
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        <Pressable style={styles.timer}>
          <MaterialCommunityIcons name="timer-outline" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.grid}>
          <MaterialCommunityIcons name="grid" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    elevation: 4,
    zIndex: 100,
    height: 0.1 * height,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goBack: {
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    height: 36,
    width: 36,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default CameraHeader;
