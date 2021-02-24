import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Video } from "expo-av";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";

import { makeGetPost } from "../../ducks/postsSlice";

export const POST_PREVIEW_MARGIN = 5;
export const POST_PREVIEW_BORDER_RADIUS = 15;
export const POST_PREVIEW_WIDTH =
  (Dimensions.get("window").width - 4 * POST_PREVIEW_MARGIN) / 2;

const authorUsernameMaxCharacters = 13;

const PostPreview = ({ id, video, author, description }) => {
  const { username, imageUrl } = author;
  const { fileUrl } = video;
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: fileUrl }}
        resizeMode="cover"
        shouldPlay={false}
        style={styles.video}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.65 }}
        locations={[0.8, 1]}
        style={styles.gradient}
      />
      <View style={{ position: "absolute", bottom: 0, margin: 7 }}>
        <View style={styles.author}>
          <Image
            source={Object({ uri: imageUrl })}
            style={styles.authorImage}
          />
          <Text style={styles.authorUsername}>
            @
            {username.length > authorUsernameMaxCharacters
              ? username.substring(0, authorUsernameMaxCharacters - 3) + "..."
              : username}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: POST_PREVIEW_WIDTH * 1.77,
    width: POST_PREVIEW_WIDTH,
    margin: POST_PREVIEW_MARGIN,
  },
  video: {
    flex: 1,
    borderRadius: POST_PREVIEW_BORDER_RADIUS,
    backgroundColor: "grey",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  cover: {
    borderRadius: POST_PREVIEW_BORDER_RADIUS,
  },
  blur: {},
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
  const getPost = makeGetPost();
  return function mapStateToProps(state, ownProps) {
    let post = getPost(state, { postId: ownProps.id });
    return { ...post };
  };
};

export default connect(makeMapStateToProps)(PostPreview);
