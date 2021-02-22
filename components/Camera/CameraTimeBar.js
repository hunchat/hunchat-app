import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

import { Colors } from "../../styles";

const { height } = Dimensions.get("window");

const CameraTimeBar = ({ duration }) => {
  let animatedDuration = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedDuration.current, {
      toValue: duration,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [duration]);

  const modulo = Animated.modulo(animatedDuration.current, 60000, {
    useNativeDriver: false,
  }); // seconds in minute
  let minutes = (duration - (duration % 60000)) / 60000; // minutes passed

  const bottom = modulo.interpolate({
    inputRange: [0, 60000],
    outputRange: [height, 0],
    extrapolate: "clamp",
    useNativeDriver: true,
  });

  return (
    <>
      <Animated.View style={[styles.container, { bottom }]} />
      {minutes > 0 && (
        <View style={styles.duration}>
          <Text style={{ color: "white" }}>{minutes}</Text>
        </View>
      )}
    </>
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
  duration: {
    position: "absolute",
    left: 15,
    bottom: "50%",
    elevation: 5,
    zIndex: 110,
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraTimeBar;
