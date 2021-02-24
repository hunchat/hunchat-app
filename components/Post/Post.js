import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Pressable,
  StatusBar,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";

import PostProgressBar from "./PostProgressBar";
import { makeGetPost } from "../../ducks/postsSlice";
import { setNewPostCommentTo } from "../../ducks/newPostSlice";

const authorUsernameMaxCharacters = 13;

const { height, width } = Dimensions.get("window");

export const POST_HEIGHT = height - getStatusBarHeight();
const ANSWER_POST_WIDTH = 0.3 * width;

const Post = ({
  id,
  video,
  description,
  author,
  link,
  views,
  likesCount,
  shares,
  commentsCount,
  commentTo,
  isViewable,
  onDidJustFinish,
  setNewPostCommentTo,
  threadGetThunk,
}) => {
  const { fileUrl } = video;
  const { username, imageUrl } = author;

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const videoRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
      if (isViewable) {
        videoRef.current.playAsync()
      } else {
        videoRef.current.setStatusAsync({ shouldPlay: false, positionMillis: 0 })
      }
    },
    [videoRef, isViewable],
  );

  const handlelinkPress = () => {
    Linking.openURL(link);
  };

  const onPressAddComment = () => {
    navigation.navigate("AddPostStack", {
      screen: "Camera",
      params: { action: "addPost" }
    });
    setNewPostCommentTo(id);
  };

  const handlePressSeeThread = () => {
    navigation.push("PostStack", {
      screen: "Thread",
      params: { postId: id }
    });
  };

  const handleLoad = (playbackObject) => {
    setDuration(playbackObject.durationMillis);
  };

  const handlePlaybackStatusUpdate = (playbackObject) => {
    setPosition(playbackObject.positionMillis);
    if (playbackObject.didJustFinish) {
      onDidJustFinish();
    }
  };

  return (
    <View style={styles.container}>
      {duration !== 0 && (
        <PostProgressBar duration={duration} position={position} />
      )}
      <Video
        ref={videoRef}
        source={{ uri: fileUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        onLoad={handleLoad}
        progressUpdateIntervalMillis={100}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        style={styles.video}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.45 }}
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
          <View style={{ flex: 7, justifyContent: "space-between" }}>
            <View style={{ paddingRight: 5 }}>
              <View style={styles.author}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.authorImage}
                />
                <Text style={styles.authorUsername}>
                  @
                  {username.length > authorUsernameMaxCharacters
                    ? username.substring(
                        0,
                        authorUsernameMaxCharacters - 3
                      ) + "..."
                    : username}
                </Text>
              </View>
              <Text
                style={styles.description}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {description}
              </Text>
              <View style={styles.linkedResources}>
                <Text style={styles.linkedResourcesText}>
                  Visit linked resources
                </Text>
              </View>
            </View>

            {/* Start post reactions */}
            <View style={styles.reactions}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <MaterialCommunityIcons name="video" size={30} color="white" />
                <Text style={styles.reactionsCount}>{commentsCount}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <MaterialCommunityIcons name="heart" size={30} color="white" />
                <Text style={styles.reactionsCount}>{likesCount}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Ionicons
                  name="ios-share-social-sharp"
                  size={30}
                  color="white"
                />
                <Text style={styles.reactionsCount}>982</Text>
              </View>
            </View>
            {/* End post reactions */}
          </View>

          {/* Start thread */}
          <View style={{ flex: 4, alignItems: "flex-start" }}>
            {commentTo &&
                <>
                <Pressable onPress={handlePressSeeThread}>
                  <Text style={{ color: "white", marginBottom: 5 }}>
                    See thread
                  </Text>
                </Pressable>
                <Pressable onPress={handlePressSeeThread}>
                  <Video
                    source={{ uri: commentTo.video.fileUrl }}
                    resizeMode="cover"
                    shouldPlay={false}
                    style={styles.answer}
                  />
                </Pressable>
                </>
            }
          </View>
          {/* End thread */}
        </View>

        <Pressable
          style={styles.addResponseButton}
          onPress={onPressAddComment}
        >
          <LinearGradient
            colors={["#FF8400", "#FF9D33"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addResponseButtonGradient}
          >
            <MaterialCommunityIcons name="video-plus" size={40} color="white" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: POST_HEIGHT,
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
  answer: {
    height: 1.77 * 0.32 * width,
    width: 0.32 * width,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
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
  },
});

const makeMapStateToProps = (state) => {
  const getPost = makeGetPost();
  return function mapStateToProps(state, ownProps) {
    let post = getPost(state, { postId: ownProps.id });
    return { ...post };
  };
};

const mapDispatchToProps = {
  setNewPostCommentTo,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Post);
