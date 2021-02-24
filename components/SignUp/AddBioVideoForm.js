import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  Text,
  Keyboard,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../../styles";

const { width } = Dimensions.get("window");

const BIO_VIDEO_PREVIEW_WIDTH = 0.35 * width;
const BIO_VIDEO_PREVIEW_HEIGHT = 1.77 * BIO_VIDEO_PREVIEW_WIDTH;

const AddBioVideoForm = ({ previewUri }) => {
  const [bio, setBio] = useState("");

  const bioRef = useRef();

  const navigation = useNavigation();

  const onPressStartChatting = () => {
    navigation.navigate("OnboardingStack", { screen: "Onboarding" });
  };

  const onPressRecordAgain = () => {
    navigation.push("OnboardingStack", {
      screen: "Camera",
      params: { action: "addBioVideo" },
    });
  };

  const onPressRecord = () => {
    navigation.push("OnboardingStack", {
      screen: "Camera",
      params: { action: "addBioVideo" },
    });
  };

  const onPressRecordLatter = () => {
    navigation.navigate("OnboardingStack", { screen: "Onboarding" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Record a short video bio to let other people know what you like to talk
        about.
      </Text>

      <View style={{ marginTop: 10, alignItems: "center" }}>
        <Text style={{ color: "white" }}>Preview</Text>
        <View style={styles.preview}>
          <Video
            source={{ uri: previewUri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={true}
            isLooping={true}
            style={styles.video}
          />
        </View>
        {previewUri && (
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.35)",
              textDecorationLine: "underline",
            }}
            onPress={onPressRecordAgain}
          >
            Record again
          </Text>
        )}
      </View>

      {previewUri ? (
        <Pressable style={styles.button} onPress={onPressStartChatting}>
          <LinearGradient
            colors={["#FF8400", "#FF9D33"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Start chatting</Text>
          </LinearGradient>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={onPressRecord}>
          <LinearGradient
            colors={["#FF8400", "#FF9D33"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Record</Text>
          </LinearGradient>
        </Pressable>
      )}

      {!previewUri && (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.35)",
              textDecorationLine: "underline",
            }}
            onPress={onPressRecordLatter}
          >
            Record later
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 0.75 * width,
  },
  instructions: {
    color: "rgba(255, 255, 255, 0.35)",
  },
  preview: {
    marginVertical: 10,
    height: BIO_VIDEO_PREVIEW_HEIGHT,
    width: BIO_VIDEO_PREVIEW_WIDTH,
  },
  video: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#898989",
  },
  button: {
    marginTop: 15,
    marginBottom: 10,
    shadowColor: "#AE5B02",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 7,

    elevation: 11,
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  error: {
    width: 0.7 * width,
  },
  errorText: {
    textAlign: "center",
    color: "white",
  },
});

function mapStateToProps(state) {
  return {
    previewUri: state.onboardingAddVideoBio.previewUri,
  };
}

export default connect(mapStateToProps)(AddBioVideoForm);
