import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

import { Colors } from "../../styles";

const { height } = Dimensions.get("window");

const VideoPostProgressBar = ({ duration, time }) => {
  let animatedTime = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedTime.current, {
      toValue: time,
      duration: 100,
      useNativeDriver: false,
    }).start();
  },[time]);

  const modulo = Animated.modulo(
    animatedTime.current,
    duration,
    { useNativeDriver: false }
  ); // seconds in minute

  const bottom = modulo.interpolate({
    inputRange: [0, duration],
    outputRange: [height, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { bottom }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 6,
    elevation: 5,
    zIndex: 110,
    backgroundColor: Colors.primary,
  },
});

export default VideoPostProgressBar;
