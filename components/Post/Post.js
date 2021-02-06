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
  Pressable,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import PostProgressBar from "./PostProgressBar";

const authorUsernameMaxCharacters = 13;

const { height, width } = Dimensions.get("window");

const ANSWER_POST_WIDTH =  0.3 * width;

function Post({
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
  const [position, setPosition] = useState(0);

  const navigation = useNavigation();

  const handleExternalLinkPress = () => {
    Linking.openURL(externalLink);
  };

  const handleAddResponsePress = () => {

  }

  const handleLoad = (playbackStatus) => {
    setDuration(playbackStatus.durationMillis);
  };

  const handlePlaybackStatusUpdate = (playbackObject) => {
    setPosition(playbackObject.positionMillis)
  };

  return (
    <View style={styles.container}>
      { duration !== 0 &&
        <PostProgressBar duration={duration} position={position}/>
      }
      <Video
        // source={{ uri: url }}
        source={require("../../assets/examples/video.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        onLoad={handleLoad}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        style={styles.video}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.45}}
        locations={[0.8, 1]}
        style={styles.gradient}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "transparent",
          padding: 15,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

          <View style={{flex: 7, justifyContent: "space-between" }}>
            <View>
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
              <View style={styles.linkedResources}>
                <Text style={styles.linkedResourcesText}>Visit linked resources</Text>
              </View>
            </View>

            {/* Start post reactions */}
            <View style={styles.reactions}>
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons name="video" size={30} color="white" />
                <Text style={styles.reactionsCount}>18k</Text>
              </View>
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons name="heart" size={30} color="white" />
                <Text style={styles.reactionsCount}>37k</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Ionicons name="ios-share-social-sharp" size={30} color="white" />
                <Text style={styles.reactionsCount}>982</Text>
              </View>
            </View>
            {/* End post reactions */}

          </View>

          {/* Start top answer */}
          <View style={{ flex: 4, alignItems: "flex-start" }}>
            <Text style={{ color: "white", marginBottom: 5 }}>See thread</Text>
            <Image
              style={styles.response}
              // source={{uri : url}}
              source={require('../../assets/examples/image-3.png')}
            />
          </View>
          {/* End top answer */}

        </View>

        <Pressable
          style={styles.addResponseButton}
          onPress={handleAddResponsePress}
        >
          <LinearGradient
            colors={['#FF8400', '#FF9D33']}
            start={{ x: 0, y: 0}}
            end={{ x: 1, y: 1}}
            style={styles.addResponseButtonGradient}>
            <MaterialCommunityIcons name="video-plus" size={40} color="white" />
          </LinearGradient>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 3,
  },
  authorImage: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: "white",
  },
  authorUsername: {
    marginHorizontal: 10,
    textAlign: "center",
    textAlignVertical: "bottom",
    color: "white",
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "white",
  },
  linkedResources: {
    marginTop: 10,
  },
  linkedResourcesText: {
    fontWeight: "700",
    color: "white",
  },
  reactions: {
    marginTop: 15,
    flexDirection: "row",
  },
  reactionsCount: {
    color: "white",
  },
  response: {
    height: 1.77 * 0.32 * width,
    width: 0.32 * width,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  responseCover: {
    borderRadius: 10,
  },
  addResponseButton: {
    marginTop: 10,
    shadowColor: "#AE5B02",
    shadowOffset: {
    	width: 2,
    	height: 1,
    },
    shadowOpacity: 0.63,
    shadowRadius: 5,

    elevation: 11,
  },
  addResponseButtonGradient: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 25,
    alignItems: "center",
  }
});

export default Post;
