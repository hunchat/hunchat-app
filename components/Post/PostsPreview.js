import React from "react";
import { View, StyleSheet, Pressable, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PostPreview, { POST_PREVIEW_HEIGHT, POST_PREVIEW_WIDTH } from "./PostPreview";
import { Colors } from "../../styles";

const NUM_COLUMNS = 2;

function PostsPreview({ postsIds, handleScroll, marginTop = 0 }) {
  const navigation = useNavigation();

  const keyExtractor = (item) => item;

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.push("Post", { postId: item });
    };
    return (
      <Pressable onPress={onPress}>
        <PostPreview id={item} />
      </Pressable>
    );
  };

  const getItemLayout = (data, index) => ({
    length: POST_PREVIEW_HEIGHT,
    offset: POST_PREVIEW_WIDTH * Math.floor(index / NUM_COLUMNS),
    index,
  });

  return (
    <Animated.FlatList
      scrollEventThrottle={1}
      data={postsIds}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      windowSize={21}
      numColumns={NUM_COLUMNS}
      onScroll={handleScroll}
      bounces={false}
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, { marginTop }]}
      columnWrapperStyle={styles.column}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.darkBackground,
  },
  contentContainer: {
    justifyContent: "space-around",
  },
  column: {
    flexShrink: 1,
  },
});

export default PostsPreview;
