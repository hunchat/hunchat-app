import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, StyleSheet, Pressable } from "react-native";

import { PostPreview, POST_PREVIEW_WIDTH } from "../Post";

const Thread = ({ postsIds }) => {
  const navigation = useNavigation();

  const keyExtractor = (item) => item;

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("PostStack", {
        screen: "Post", params: { postId: item }
      });
    };

    return (
      <View>
        <Pressable onPress={onPress}>
          <PostPreview id={item} />
        </Pressable>
        <View style={styles.timeline} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postsIds}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={POST_PREVIEW_WIDTH}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  timeline: {
    marginTop: 20,
    height: 3,
    width: "100%",
    backgroundColor: "white",
  },
});

export default Thread;
