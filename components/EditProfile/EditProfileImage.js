import React, { useState } from "react";
import { View, StyleSheet, Pressable, ImageBackground, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";

import { getCameraRollPermission } from "../../utils/permissions";
import { Colors } from "../../styles";

const EditProfileImage = ({ url, onChangeImage }) => {
  const [borderColor, setBorderColor] = useState("white");

  const chooseProfileImage = () => {
    // Choose profile image
    // Open camera roll
    getCameraRollPermission().then((access) => {
      if (access === "granted") {
        // If app has access to camera roll
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
          .then((result) => {
            // Camera roll was closed
            if (!result.cancelled) {
              // If an image was picked from the camera roll

              // ImagePicker saves the taken photo to disk and returns a local URI to it
              let localUri = result.uri;
              let filename = localUri.split("/").pop();

              // Infer the type of the image
              let match = /\.(\w+)$/.exec(filename);
              let type = match ? `image/${match[1]}` : `image`;

              onChangeImage({
                url: result.uri,
                file: { uri: localUri, name: filename, type },
              });
            }
          })
          .catch((error) => {
            // Do something
          });
      }
    });
  };

  const onPressIn = () => {
    setBorderColor("grey");
  };

  const onPressOut = () => {
    setBorderColor("white");
  };

  const borderStyle = StyleSheet.create({
    main: {
      borderRadius: 100,
      borderWidth: 3,
      borderColor,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageContainer}
        imageStyle={styles.image}
        source={{ uri: url }}
      >
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={chooseProfileImage}
          style={[styles.blur, borderStyle.main]}
        >
          <MaterialIcons name="camera-alt" size={24} color="white" />
        </Pressable>
      </ImageBackground>
      <Pressable onPress={chooseProfileImage}>
        <Text style={styles.text}>Update profile picture</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 20,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "transparent",
  },
  blur: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba( 0, 0, 0, 0.3 )",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
  },
});

export default EditProfileImage;
