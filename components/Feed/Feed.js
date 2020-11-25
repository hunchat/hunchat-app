import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Video } from '../Video';


const video = {
  id: '1',
  description: 'This is a very short description of this video I just posted',
  author: {
    username: '@JaneFisher',
    imageUrl: ''
  },
  externalLink: 'example.com',
  views: '306',
  likes: '189',
  shares: '22',
  answer: '1',
}


function Feed({
  navigation,
}) {
  return (
    <View style={styles.container}>
      <Video {...video} navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Feed;
