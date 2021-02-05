import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import { Video } from "expo-av";

import VideoPostProgressBar from "./VideoPostProgressBar";

const authorUsernameMaxCharacters = 13;

const { height, width } = Dimensions.get("window");

function VideoPost({
  id,
  url,
  description,
  author,
  externalLink,
  views,
  likes,
  shares,
  answer,
}) {
  const [duration, setDuration] = useState(0);

  const navigation = useNavigation();

  const handleExternalLinkPress = () => {
    Linking.openURL(externalLink);
  };

  const onLoad = (data) => {
    setDuration(data.durationMillis);
  };

  return (
    <View style={styles.container}>
      <VideoPostProgressBar duration={duration} time={30}/>
      <Video
        // source={{ uri: url }}
        source={require("../../assets/examples/video.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        onLoad={onLoad}
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    // flex: 1,
    height,
    width,
  },
});

export default VideoPost;
