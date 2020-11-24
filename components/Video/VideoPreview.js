import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';


const spacing = 15;
const width = (Dimensions.get('window').width - 4 * 15) / 2;


function VideoPreview({
  id,
  title,
  author,
  navigation,
}) {
  return (
    <View style={styles.container}>
    </View>
  )
}

const styles = {
  container: {
    backgroundColor: 'red',
    height: 250,
    width: width,
    margin: spacing,
    borderRadius: 15,
  }
}

export default VideoPreview;
