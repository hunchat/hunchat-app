import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar
 } from 'react-native';

import { VideoPost } from '../Video';
import ViewPager from '../ViewPager';


function Feed({
  navigation,
}) {
  const renderItem = ({ item }) => {
    return <VideoPost key={item.id} {...item} navigation={navigation}/>
  };

  const keyExtractor = item => item.id;

  return (
    <View style={styles.container}>
      <ViewPager
        ref={ref => this.viewPager = ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.viewPager}
        size={size}
        horizontal={false}
        snapToInterval={size}
        snapToAlignment='end'
      />
    </View>
  )
}

const data = [
  {
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
  },
  {
    id: '2',
    description: 'This is a very short description of this video I just posted',
    author: {
      username: '@JonDoe',
      imageUrl: ''
    },
    externalLink: 'example.com',
    views: '200',
    likes: '81',
    shares: '12',
    answer: '5',
  },
  {
    id: '3',
    description: 'This is a very short description of this video I just posted',
    author: {
      username: '@JaneDoe',
      imageUrl: ''
    },
    externalLink: 'example.com',
    views: '404',
    likes: '121',
    shares: '21',
    answer: '26',
  },
]

const size = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
})

export default Feed;
