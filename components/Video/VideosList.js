import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import VideoPreview from './VideoPreview';

const lists = [
  {
    id: '1',
    description: 'This is a very short description',
    author: {
      username: '@JaneFisher'
    }
  },
  {
    id: '2',
    description: 'This is a short description of the video I just posted in which this text should not show',
    author: {
      username: '@AVeryLongUsername'
    }
  },
  {
    id: '3',
    description: 'This is a short description of the video I just posted in which this text should not show',
    author: {
      username: '@Short'
    }
  },
  {
    id: '4',
    description: 'This is a short description of the video I just posted in which this text should not show',
    author: {
      username: '@Medium'
    }
  },
  {
    id: '5',
    description: 'This is a short description of the video I just posted in which this text should not show',
    author: {
      username: '@authorusername'
    }
  },
  {
    id: '6',
    description: 'This is a short description of the video I just posted in which this text should not show',
    author: {
      username: '@authorusername'
    }
  },
  {
    id: '7',
    description: 'This is a short description of the video I just posted in which this text should not show',
    author: {
      username: '@authorusername'
    }
  },
]


function VideosList({
  navigation,
}) {

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => (
    <VideoPreview {...item} navigation={navigation}/>
  );

  return (
    <FlatList
      data={lists}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
      contentContainerStyle={styles.list}
      numColumns={2}
      columnWrapperStyle={styles.column}
    />
  )
}

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
})

export default VideosList;
