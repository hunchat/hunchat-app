import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { Colors } from "../../styles";

const { height } = Dimensions.get("window");

const CameraBottomBar = ({
  onHandleFlashMode,
  startRecording,
  stopRecording,
  reverseCamera,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onHandleFlashMode} style={styles.flash}>
        <MaterialCommunityIcons name="flash" size={24} color="white" />
      </Pressable>
      <TouchableWithoutFeedback
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        <View style={styles.captureButton}>
          <View style={styles.captureButtonInner}/>
        </View>
      </TouchableWithoutFeedback>
      <Pressable
        onPress={reverseCamera}
        style={styles.reverse}
      >
        <MaterialIcons name="flip-camera-android" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    elevation: 4,
    zIndex: 100,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  flash: {
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    bottom: 8,
    width: 60,
    height: 60,
    backgroundColor: "transparent",
    borderWidth: 4,
    borderRadius: 60,
    borderColor: Colors.primary,
  },
  captureButtonInner: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 4,
    borderRadius: 60,
    borderColor: "white",
  },
  reverse: {
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default CameraBottomBar;
