import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

import { Colors } from "../../styles";

const { height } = Dimensions.get("window");

const PostProgressBar = ({ duration, position }) => {
  let animatedPosition = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedPosition.current, {
      toValue: position,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [position]);

  const modulo = Animated.modulo(animatedPosition.current, duration, {
    useNativeDriver: false,
  });

  const top = modulo.interpolate({
    inputRange: [0, duration],
    outputRange: [height, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  return <Animated.View style={[styles.container, { top }]} />;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 4,
    elevation: 5,
    zIndex: 110,
    backgroundColor: Colors.primary,
  },
});

export default PostProgressBar;
