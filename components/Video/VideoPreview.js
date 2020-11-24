import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';


const spacing = 15;
const width = (Dimensions.get('window').width - 4 * 15) / 2;

const authorUsernameMaxCharacters = 13;


function VideoPreview({
  id,
  description,
  author,
  navigation,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.author}>
        <Image source={Object({uri: author.imageUrl})} style={styles.authorImage} />
        <Text style={styles.authorUsername}>
          { ((author.username).length > authorUsernameMaxCharacters) ?
              (((author.username).substring(0, authorUsernameMaxCharacters-3)) + '...') :
              author.username}
        </Text>
      </View>
      <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
        {description}
      </Text>
    </View>
  )
}

const styles = {
  container: {
    backgroundColor: '#d3d3d3',
    height: 250,
    width: width,
    margin: spacing,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  author: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  authorImage: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 3,
  },
  authorUsername: {
    marginHorizontal: 5,
    textAlignVertical: 'bottom',
    numberOfLines: 1,
    color: 'white',
  },
  description: {
    fontSize: 14,
    numberOfLines: 3,
  }
}

export default VideoPreview;
