import React from "react";
import { View, StyleSheet, Animated } from "react-native";

import VideoPreview from "./VideoPreview";

function VideosList({ videosIds, handleScroll, marginTop }) {
  const keyExtractor = (item) => item;

  const renderItem = ({ item }) => <VideoPreview id={item} />;

  return (
    <Animated.FlatList
      scrollEventThrottle={1}
      data={videosIds}
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

export default VideosList;
