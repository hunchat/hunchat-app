import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { pure } from "recompose";
import ReadMore from "react-native-read-more-text";

import PostProgressBar from "./PostProgressBar";
import { makeGetPost } from "../../ducks/postsSlice";
import { setNewPostCommentTo } from "../../ducks/newPostSlice";

const authorUsernameMaxCharacters = 13;

const { height, width } = Dimensions.get("window");

export const POST_HEIGHT = height - getStatusBarHeight();

const Post = ({
  id,
  video = {},
  description = "",
  author = {},
  link,
  views,
  likesCount,
  sharesCount = 0,
  commentsCount,
  commentTo,
  isViewable,
  onDidJustFinish,
  setNewPostCommentTo,
  threadGetThunk,
}) => {
  const { fileUrl = null, posterUrl = null, duration = 0 } = video;
  const { username = "", imageUrl = null } = author;

  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const videoRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (isViewable) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.setStatusAsync({ shouldPlay: false, positionMillis: 0 });
    }
  }, [videoRef, isViewable]);

  const handlelinkPress = () => {
    Linking.openURL(link);
  };

  const onPressAddComment = () => {
    navigation.navigate("AddPostStack", {
      screen: "Camera",
      params: { action: "addPost" },
    });
    setNewPostCommentTo(id);
  };

  const handlePressSeeThread = () => {
    navigation.push("PostStack", {
      screen: "Thread",
      params: { postId: id },
    });
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoad = (playbackObject) => {
    setIsLoading(false);
    setDurationMillis(playbackObject.durationMillis);
  };

  const handlePlaybackStatusUpdate = (playbackObject) => {
    setPosition(playbackObject.positionMillis);
    if (playbackObject.didJustFinish) {
      onDidJustFinish();
    }
  };

  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={{ color: "white", fontWeight: "bold", marginTop: 5 }}
        onPress={handlePress}
      >
        See more
      </Text>
    );
  };

  const renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={{ color: "white", fontWeight: "bold", marginTop: 5 }}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Start progress bar */}
      {durationMillis !== 0 && (
        <PostProgressBar duration={durationMillis} position={position} />
      )}
      {/* End progress bar */}

      {/* Start loading indicator */}
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            elevation: 5,
            zIndex: 110,
          }}
        >
          <View style={{ top: "-50%", left: "-50%" }}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      )}
      {/* End loading indicator */}

      <Video
        ref={videoRef}
        source={{ uri: fileUrl }}
        posterSource={{ uri: posterUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        usePoster={true}
        progressUpdateIntervalMillis={100}
        onLoadStart={onLoadStart}
        onLoad={onLoad}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        style={styles.video}
        posterStyle={{ ...StyleSheet.absoluteFill, resizeMode: "cover" }}
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
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "transparent"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0.9, 1]}
          style={styles.gradient}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 7, justifyContent: "space-between", paddingRight: 5 }}>
            <View>
              <View style={styles.author}>
                <Image source={{ uri: imageUrl }} style={styles.authorImage} />
                <Text style={styles.authorUsername}>
                  @
                  {username.length > authorUsernameMaxCharacters
                    ? username.substring(0, authorUsernameMaxCharacters - 3) +
                      "..."
                    : username}
                </Text>
              </View>

              {/* Start description */}
              <ReadMore
                numberOfLines={3}
                renderTruncatedFooter={renderTruncatedFooter}
                renderRevealedFooter={renderRevealedFooter}
              >
                <Text style={styles.description} ellipsizeMode="tail">
                  {description}
                </Text>
              </ReadMore>
              {/* End description */}

              <View style={styles.linkedResources}>
                <Text style={styles.linkedResourcesText}>
                  Visit linked resources
                </Text>
              </View>
            </View>

            {/* Start post reactions */}
            <View style={styles.reactions}>
              <View style={{ alignItems: "center", marginRight: 30 }}>
                <MaterialCommunityIcons name="video" size={35} color="white" />
                <Text style={styles.reactionsCount}>{commentsCount}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons name="heart" size={35} color="white" />
                <Text style={styles.reactionsCount}>{likesCount}</Text>
              </View>
            </View>
            {/* End post reactions */}
          </View>

          {/* Start thread */}
          <View style={{ flex: 4, justifyContent: "flex-end", alignItems: "flex-start" }}>
            {commentTo && (
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
            )}
          </View>
          {/* End thread */}
        </View>

        {/* Start add comment button */}
        <Pressable style={styles.addResponseButton} onPress={onPressAddComment}>
          <LinearGradient
            colors={["#FF8400", "#FF9D33"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.addResponseButtonGradient}
          >
            <MaterialCommunityIcons name="video-plus" size={40} color="white" />
          </LinearGradient>
        </Pressable>
        {/* End add comment button */}
      </View>
    </View>
  );
};

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

export default pure(connect(makeMapStateToProps, mapDispatchToProps)(Post));
