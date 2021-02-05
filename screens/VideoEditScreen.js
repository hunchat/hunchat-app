import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import {
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import { Video } from "expo-av";
// import { VideoPlayer, Trimmer } from 'react-native-video-processing';

import { VideoEditBottomBar, VideoEditHeader } from "../components/VideoEdit";
import { Colors } from "../styles";

const { height, width } = Dimensions.get("window");

// class VideoEditScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       duration: 0,
//     }
//
//     this.onPressRightArrow = this.onPressRightArrow.bind(this);
//   }
//
//   onPressRightArrow() {
//     this.props.navigation.navigate("AddVideoStack", { screen: "AddVideo" });
//   }
//
//   trimVideo() {
//     const options = {
//       startTime: 0,
//       endTime: 15,
//       quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
//       saveToCameraRoll: true, // default is false // iOS only
//       saveWithCurrentDate: true, // default is false // iOS only
//     };
//     this.videoPlayerRef.trim(options)
//       .then((newSource) => console.log(newSource))
//       .catch(console.warn);
//   }
//
//   compressVideo() {
//     const options = {
//       width: width,
//       height: height,
//       bitrateMultiplier: 3,
//       saveToCameraRoll: true, // default is false, iOS only
//       saveWithCurrentDate: true, // default is false, iOS only
//       minimumBitrate: 300000,
//       removeAudio: false, // default is false
//     };
//     this.videoPlayerRef.compress(options)
//       .then((newSource) => console.log(newSource))
//       .catch(console.warn);
//   }
//
//   getPreviewImageForSecond(second) {
//     const maximumSize = { width: width, height: height }; // default is { width: 1080, height: 1080 } iOS only
//     this.videoPlayerRef.getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
//     .then((base64String) => console.log('This is BASE64 of image', base64String))
//     .catch(console.warn);
//   }
//
//   getVideoInfo() {
//     this.videoPlayerRef.getVideoInfo()
//     .then((info) => console.log(info))
//     .catch(console.warn);
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <VideoEditHeader />
//         <VideoPlayer
//           ref={ref => this.videoPlayerRef = ref}
//           startTime={0}  // seconds
//           endTime={20}   // seconds
//           play={true}     // default false
//           replay={true}   // should player play video again if it's ended
//           rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
//           source={this.props.uri}
//           playerHeight={height} // iOS only
//           playerWidth={width} // iOS only
//           style={{ backgroundColor: 'black' }}
//           resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
//           onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
//         />
//         <Trimmer
//           source={this.props.uri}
//           height={100}
//           width={300}
//           onTrackerMove={(e) => console.log(e.currentTime)} // iOS only
//           currentTime={this.video.currentTime} // use this prop to set tracker position iOS only
//           themeColor={'white'} // iOS only
//           thumbWidth={30} // iOS only
//           trackerColor={Colors.primary} // iOS only
//           onChange={(e) => console.log(e.startTime, e.endTime)}
//         />
//       </View>
//     );
//   }
// }

class VideoEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
    }

    this.onPressRightArrow = this.onPressRightArrow.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onPressRightArrow() {
    this.props.navigation.navigate("AddVideoStack", { screen: "AddVideo" });
  }

  onLoad(data) {
    this.setState({ duration: data.durationMillis });
  }

  render() {
    return (
      <View style={styles.container}>
        <VideoEditHeader />
        <Video
          source={{ uri: this.props.uri }}
          onLoad={this.onLoad}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          useNativeControls={true}
          style={styles.video}
        />
        {/*<VideoEditBottomBar
          source={this.props.uri}
          duration={this.state.duration}
          handleDone={this.onPressRightArrow}
        />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  uri: state.newPost.uri,
});

export default withNavigation(connect(mapStateToProps)(VideoEditScreen));
