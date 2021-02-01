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
import { SharedElement } from 'react-navigation-shared-element';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useVector, snapPoint } from "react-native-redash";
import { Icon } from 'react-native-elements';
import { Video } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';


const authorUsernameMaxCharacters = 13;

const { height, width } = Dimensions.get('window');
const AnimatedVideo = Animated.createAnimatedComponent(Video);


function VideoPost({
  id,
  url,
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

  const handlePressVideoAnswer = () => {
    navigation.push(
      "VideoStack",
      {
        screen: "Video",
        params : {
          video: {
            id: answer.id,
          },
        }
      })
  }

  const isGestureActive = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX;
      translateY.value = translationY;
    },
    onEnd: ({ velocityX, velocityY }) => {
      const snapBack =
        snapPoint(translateY.value, velocityY, [0, height]) === height;

      if (snapBack) {
        navigation.goBack();
      } else {
        translateX.value = withSpring(0, { velocity: velocityX });
        translateY.value = withSpring(0, { velocity: velocityY });
      }
      isGestureActive.value = false;
    },
  });
  const borderStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(isGestureActive.value ? 24: 0),
  }))

  const containerStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      transform: [
        { translateX: translateX.value * scale },
        { translateY: translateY.value * scale },
        { scale },
      ],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[containerStyle, borderStyle, { backgroundColor: 'green' }]}>
        <SharedElement id={id} style={{ flex: 1 }}>
          <Animated.Image
            resizeMode="cover"
            style={[styles.video, borderStyle]}
            source={{uri: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/127877000_204528327851521_3923653324622951276_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=uOopWH1QrsUAX8E6EYW&tp=1&oh=ad6310c0a8729e6ed7208002c777062d&oe=5FF0C806'}}
          />
          {/*<AnimatedVideo
            source={{ uri: url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={[styles.video, borderStyle]}
          />*/}
        </SharedElement>
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
            <TouchableOpacity onPress={handleExternalLinkPress}>
              <Text style={styles.externalLink}>Visit linked resources</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.answer} onPress={handlePressVideoAnswer}>
            <Video source={{ uri: "https://instagram.flis5-1.fna.fbcdn.net/v/t50.2886-16/128422991_423213609066129_6831456051227847080_n.mp4?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=EGKCGPJF10UAX-4fYyG&oe=5FC73F22&oh=cd22acb05b17164ab1575dcaceddf1a4"}} style={styles.answerThumbnail} />
          </TouchableOpacity>
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
      </Animated.View>
    </PanGestureHandler>
  )
};

const styles = StyleSheet.create({
  video: {
    ...StyleSheet.absoluteFill,
    position: 'absolute',
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
  answerThumbnail: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 10,
  },
  reactions: {
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






export default VideoPost;
