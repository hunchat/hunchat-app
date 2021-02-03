import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Camera } from "expo-camera";
import { Icon } from "react-native-elements";

import { CameraHeader, CameraBottomBar } from "../components/Camera";
import { setVideoUri } from "../ducks/newPostSlice";
import { Colors } from "../styles";

const { height } = Dimensions.get("window");

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      ref: null,
      flashMode: Camera.Constants.FlashMode.off,
      type: Camera.Constants.Type.back,
      video: null,

      duration: 0, // recording duration in ms.
      start: 0,
      isOn: false
    };

    this.cameraRef = React.createRef();

    this.requestCameraPermission = this.requestCameraPermission.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.reverseCamera = this.reverseCamera.bind(this);
    this.onHandleFlashMode = this.onHandleFlashMode.bind(this);
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

  async requestCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onHandleFlashMode() {
    this.setState((state) => ({
      flashMode:
        state.flashMode === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.torch
          : Camera.Constants.FlashMode.off,
    }));
  }

  async startRecording() {
    this.startTimer();
    let video = await this.cameraRef.current.recordAsync();
    this.props.setVideoUri(video.uri);
  }

  async stopRecording() {
    this.cameraRef.current.stopRecording();
    this.props.navigation.navigate("AddVideoStack", { screen: "VideoEdit" });
  }

  reverseCamera() {
    this.setState((state) => ({
      type:
        state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    }));
  }

  startTimer() {
    this.setState({
      duration: this.state.duration,
      start: Date.now() - this.state.duration,
      isOn: true
    })
    this.timer = setInterval(() => this.setState({
      duration: Date.now() - this.state.start
    }), 1000);
  }

  stopTimer() {
    this.setState({ isOn: false })
    clearInterval(this.timer)
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return <View />;
    }

    if (this.state.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    // const timeBarBottom = this.state.duration.interpolate({
    //   inputRange: [0, 60000],
    //   outputRange: [height, 0],
    //   extrapolate: "clamp"
    // });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.timeBar,
            {
              // bottom: timeBarBottom,
              bottom: 80,
            }
          ]}
        />
        <View style={styles.duration}>
          <Text style={{ color: "white" }}>2</Text>
        </View>
        <CameraHeader />
        <Camera
          style={styles.camera}
          ref={this.cameraRef}
          flashMode={this.state.flashMode}
          type={this.state.type}
        >
          <View style={styles.picture}></View>
        </Camera>
        <CameraBottomBar
          onHandleFlashMode={this.onHandleFlashMode}
          startRecording={this.startRecording}
          stopRecording={this.stopRecording}
          reverseCamera={this.reverseCamera}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 6,
    elevation: 5,
    zIndex: 110,
    backgroundColor: Colors.primary,
  },
  duration: {
    position: "absolute",
    left: 15,
    bottom: "50%",
    elevation: 5,
    zIndex: 110,
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
  },
  picture: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
});

const mapDispatchToProps = {
  setVideoUri,
};

export default withNavigation(connect(null, mapDispatchToProps)(CameraScreen));
