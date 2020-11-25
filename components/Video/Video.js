import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import { Icon } from 'react-native-elements';


const authorUsernameMaxCharacters = 13;


function Video({
  id,
  description,
  author,
  externalLink,
  views,
  likes,
  shares,
  answer,
  navigation,
}) {

  const handleExternalLinkPress = () => {
    Linking.openURL(externalLink);
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.info}>
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
          <Text style={styles.externalLink}>Visit linked resources</Text>
        </View>
        <View style={styles.answer}></View>
      </View>
      <View style={styles.reactions}>
        <TouchableOpacity style={styles.addVideoTabBarButton}>
          <Icon name="videocam" color="white" size={53} />
        </TouchableOpacity>
        <View style={styles.viewsTabBarButton}>
          <TouchableOpacity>
            <Icon name="ondemand-video" color="grey" size={35} />
          </TouchableOpacity>
          <Text style={styles.views}>{views}</Text>
        </View>
        <View style={styles.likesTabBarButton}>
          <TouchableOpacity>
            <Icon name="heart" type="material-community" color="grey" size={35} />
          </TouchableOpacity>
          <Text style={styles.likes}>{likes}</Text>
        </View>
        <View style={styles.sharesTabBarButton}>
          <TouchableOpacity>
            <Icon name="share" type="material-community" color="grey" size={35} />
          </TouchableOpacity>
          <Text style={styles.shares}>{shares}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  info : {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    margin: 7,
  },
  author: {
    flexDirection: 'row',
    margin: 7,
  },
  authorImage: {
    backgroundColor: 'grey',
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 3,
  },
  authorUsername: {
    marginHorizontal: 5,
    textAlignVertical: 'bottom',
    color: 'white',
  },
  description: {
    fontSize: 14,
    marginVertical: 7,
    color: 'white',
  },
  externalLink: {
    fontSize: 15,
    marginVertical: 7,
    color: 'white',
  },
  answer: {
    flex: 1,
    backgroundColor: 'grey',
    height: Dimensions.get('window').height * 0.25,
    marginBottom: 15,
    marginRight: 15,
    borderRadius: 10,
  },
  reactions : {
    backgroundColor: '#e9e9e9',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addVideoTabBarButton: {
    flex: 46,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'black',
  },
  viewsTabBarButton: {
    flex: 18,
    alignItems: 'center',
  },
  views: {
    color: 'grey',
  },
  likesTabBarButton: {
    flex: 18,
    alignItems: 'center',
  },
  likes: {
    color: 'grey',
  },
  sharesTabBarButton: {
    flex: 18,
    alignItems: 'center',
  },
  shares: {
    color: 'grey',
  },
})






export default Video;
