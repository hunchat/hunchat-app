import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import VideoPreview from './VideoPreview';


function VideosList({
  videosIds,
  navigation,
}) {

  const keyExtractor = (item) => item;

  const renderItem = ({ item }) => (
    <VideoPreview id={item} navigation={navigation}/>
  );

  return (
    <FlatList
      data={videosIds}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
      contentContainerStyle={styles.list}
      numColumns={2}
      columnWrapperStyle={styles.column}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  list: {
    justifyContent: 'space-around',
  },
  column: {
    flexShrink: 1,
  },
});

export default VideosList;
