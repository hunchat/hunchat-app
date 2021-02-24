import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Animated, Pressable } from "react-native";

import { PostPreview } from "../Post";

function ListPostsPreview({ id, postsIds, handleScroll, marginTop }) {
  const navigation = useNavigation();

  const keyExtractor = (item) => item;

  const renderItem = ({ item }) => {
    const handlePress = () => {
      navigation.push("ListStack", {
        screen: "ListPosts",
        params: {
          list: { id: id },
        },
      });
    };
    return (
      <Pressable onPress={handlePress}>
        <PostPreview id={item} />
      </Pressable>
    );
  };

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
