import React, { useState, useCallback, useRef } from "react";
import { View, FlatList, StyleSheet, Dimensions, StatusBar } from "react-native";

import Post, { POST_HEIGHT } from "../Post";

const { width } = Dimensions.get("window");

const ListPosts = ({ id, postsIds, initialScrollIndex = 0 }) => {
  const [viewableIndex, setViewableIndex] = useState();
  const flatListRef = useRef(null);

  const scrollToNextIndex = () => {
    if (viewableIndex !== postsIds.length - 1) {
      flatListRef.current.scrollToIndex({ index: viewableIndex + 1 });
    }
  };

  const keyExtractor = (item) => item;

  const renderItem = ({ item, index }) => (
    <Post
      id={item}
      isViewable={index === viewableIndex}
      onDidJustFinish={scrollToNextIndex}
    />
  );

  const getItemLayout = (data, index) => ({
    length: POST_HEIGHT,
    offset: POST_HEIGHT * index,
    index,
  });

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    if (viewableItems.length !== 0) {
      setViewableIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  return (
    <FlatList
      ref={flatListRef}
      data={postsIds}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialScrollIndex={initialScrollIndex}
      getItemLayout={getItemLayout}
      initialNumToRender={2}
      maxToRenderPerBatch={2}
      windowSize={7}
      snapToInterval={POST_HEIGHT}
      snapToEnd
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default ListPosts;
