import React from "react";
import { View, StyleSheet, Animated } from "react-native";

import PostPreview from "./PostPreview";

function PostsList({ postsIds, handleScroll, marginTop }) {
  const keyExtractor = (item) => item;

  const renderItem = ({ item }) => <PostPreview id={item} />;

  return (
    <Animated.FlatList
      scrollEventThrottle={1}
      data={postsIds}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
      contentContainerStyle={[styles.list, { marginTop }]}
      numColumns={2}
      columnWrapperStyle={styles.column}
      onScroll={handleScroll}
      bounces={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  list: {
    justifyContent: "space-around",
  },
  column: {
    flexShrink: 1,
  },
});

export default PostsList;
