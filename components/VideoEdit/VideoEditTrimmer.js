import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import * as VideoThumbnails from 'expo-video-thumbnails';

const { width } = Dimensions.get("window");

const TRIMMER_WIDTH = 0.75 * width;
const NUMBER_OF_THUMBNAILS = 14;

const VideoEditTrimmer = ({ url, duration }) => {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    var i;
    for (i=0; i<duration; i = i + (duration/NUMBER_OF_THUMBNAILS)) {
      generateThumbnail(i)
    }
  },[duration]);

  const generateThumbnail = async (time) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        url,
        { quality: 1, time: time }
      );
      setThumbnails(thumbnails => {
        const newThumbnails = thumbnails.concat(uri);
        return {
          newThumbnails,
        };
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      {thumbnails.map((thumbnailURI, index) => (
        <Image
          style={[styles.thumbnail, { left: TRIMMER_WIDTH * index * (1/NUMBER_OF_THUMBNAILS)}]}
          source={{ uri: thumbnailURI }}
        />
      ))}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: TRIMMER_WIDTH,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "blue"
  },
  thumbnail: {
    position: "absolute",
    height: 60,
    bottom: 0,
    resizeMode: "contain"
  },
})

export default VideoEditTrimmer;
