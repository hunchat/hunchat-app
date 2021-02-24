import React from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import VideoEditTrimmer from "./VideoEditTrimmer";

const { height } = Dimensions.get("window");

const VideoEditBottomBar = ({ url, duration, handleDone }) => {
  return (
    <View style={styles.container}>
      <VideoEditTrimmer url={url} duration={duration} />
      <Pressable onPress={handleDone}>
        <Ionicons name="ios-arrow-forward" size={35} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 0.15 * height,
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
});

export default VideoEditBottomBar;
