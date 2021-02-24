import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

const VIDEO_BIO_CARD_WIDTH = 0.35 * width;
const VIDEO_BIO_CARD_HEIGHT = 1.77 * VIDEO_BIO_CARD_WIDTH;

const EditProfileBioVideo = ({ file, fileUrl, duration, height, width }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProfileStack", {
      screen: "Camera",
      params: { action: "editProfile" },
    });
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: fileUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
      <Pressable onPress={handlePress}>
        <Text style={styles.text}>Update video bio</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    marginVertical: 5,
    height: VIDEO_BIO_CARD_HEIGHT,
    width: VIDEO_BIO_CARD_WIDTH,
    borderRadius: 10,
    backgroundColor: "lightgrey",
  },
  text: {
    fontWeight: "600",
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
  },
});

export default EditProfileBioVideo;
