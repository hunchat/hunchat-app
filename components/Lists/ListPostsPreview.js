import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Animated, Pressable } from "react-native";

import { PostPreview, POST_PREVIEW_HEIGHT, POST_PREVIEW_WIDTH } from "../Post";

const NUM_COLUMNS = 2;

function ListPostsPreview({ id, postsIds, handleScroll, marginTop }) {
  const navigation = useNavigation();

  const keyExtractor = (item) => item;

  const renderItem = ({ item, index }) => {
    const handlePress = () => {
      navigation.push("ListStack", {
        screen: "ListPosts",
        params: {
          list: { id: id },
          initialScrollIndex: index,
        },
      });
    };
    return (
      <Pressable onPress={handlePress}>
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
      contentContainerStyle={[styles.list, { marginTop }]}
      columnWrapperStyle={styles.column}
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

export default ListPostsPreview;
