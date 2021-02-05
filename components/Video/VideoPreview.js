import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from 'expo-linear-gradient';

import { makeGetVideo } from "../../ducks/videosSlice";

const VIDEO_PREVIEW_MARGIN = 5;
const VIDEO_PREVIEW_BORDER_RADIUS = 15;
const VIDEO_PREVIEW_WIDTH = (Dimensions.get("window").width - 4 * VIDEO_PREVIEW_MARGIN) / 2;

const authorUsernameMaxCharacters = 13;

const VideoPreview = ({
  id,
  url,
  author,
  description,
}) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);

  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  const onPress = () => {
    setOpacity(0);
    navigation.push("VideoStack", {
      screen: "Video",
      params: { video: { id: id } },
    });
  };

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={onPress}
    >
      <ImageBackground
        style={[styles.container, { opacity: opacity }]}
        imageStyle={styles.cover}
        // source={{uri : url}}
        source={require('../../assets/examples/image-1.png')}
        >
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0.65}}
          locations={[0.8, 1]}
          style={styles.gradient}
        />
        <View style={styles.author}>
          <Image
            source={Object({ uri: "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/37811221_218343765548379_8242830384702685184_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=YMlw92AGb6wAX8y3plx&tp=1&oh=2d55648e9563b01e0c3a341863574067&oe=60430B10" })}
            style={styles.authorImage}
          />
          <Text style={styles.authorUsername}>
            @
            {author.username.length > authorUsernameMaxCharacters
              ? author.username.substring(0, authorUsernameMaxCharacters - 3) +
                "..."
              : author.username}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </ImageBackground>
    </Pressable>
  );
};

const styles = {
  container: {
    height: VIDEO_PREVIEW_WIDTH * 1.77,
    width: VIDEO_PREVIEW_WIDTH,
    margin: VIDEO_PREVIEW_MARGIN,
    borderRadius: VIDEO_PREVIEW_BORDER_RADIUS,
    padding: 7,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  cover: {
    borderRadius: VIDEO_PREVIEW_BORDER_RADIUS,
  },
  blur: {

  },
  author: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  authorImage: {
    backgroundColor: "white",
    height: 30,
    width: 30,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "white",
    marginRight: "auto",
  },
  authorUsername: {
    marginHorizontal: 5,
    textAlign: "center",
    textAlignVertical: "bottom",
    color: "white",
    fontWeight: "600",
    marginRight: "auto",
  },
  description: {
    fontSize: 14,
    color: "white",
  },
};

const makeMapStateToProps = (state) => {
  const getVideo = makeGetVideo();
  return function mapStateToProps(state, ownProps) {
    let video = getVideo(state, { videoId: ownProps.id });
    return { ...video };
  };
};

export default connect(makeMapStateToProps)(VideoPreview);
