import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { connect } from 'react-redux';
import { SharedElement } from 'react-navigation-shared-element';
import { Video } from 'expo-av';

import { makeGetVideo } from '../../ducks/videosSlice';


const margin = 15;
const borderRadius = 15;
const width = (Dimensions.get('window').width - 4 * margin) / 2;

const authorUsernameMaxCharacters = 13;


function VideoThumbnail({
  id,
  url,
  description,
  author,
}) {
  const navigation = useNavigation();
  const [opacity, setOpacity] = React.useState(1);
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  const onPress = () => {
    setOpacity(0);
    navigation.push(
      "VideoStack",
      { screen: "Video", params : { video: { id: id } } }
    );
  };

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1})}
      onPress={onPress}
    >
      <View style={[styles.container, { opacity: opacity }]}>
        <SharedElement id={id} style={{ flex: 1 }}>
          <Image
            resizeMode="cover"
            style={styles.video}
            source={{uri: 'https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/127877000_204528327851521_3923653324622951276_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=uOopWH1QrsUAX8E6EYW&tp=1&oh=ad6310c0a8729e6ed7208002c777062d&oe=5FF0C806'}}
          />
          {/*<Video
            source={{ uri: url }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            style={styles.video}
          />*/}
        </SharedElement>
        <View style={styles.author}>
          <Image source={Object({uri: author.imageUrl})} style={styles.authorImage} />
          <Text style={styles.authorUsername}>
            @{ ((author.username).length > authorUsernameMaxCharacters) ?
                (((author.username).substring(0, authorUsernameMaxCharacters-3)) + '...') :
                author.username}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </Pressable>
  )
};

class VideoPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <VideoThumbnail
        id={this.props.id}
        url={this.props.url}
        description={this.props.description}
        author={this.props.author}
      />
    )
  }
};

const styles = {
  container: {
    height: width * 1.77,
    width,
    margin,
    padding: 7,
    borderRadius,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'green',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius,
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
    color: 'white',
  },
  description: {
    fontSize: 14,
  }
};


const makeMapStateToProps = (state) => {
  const getVideo = makeGetVideo();
  return function mapStateToProps(state, ownProps) {
    let video = getVideo(state, { videoId: ownProps.id });
    return {...video};
  }
};


export default connect(makeMapStateToProps)(VideoPreview);
