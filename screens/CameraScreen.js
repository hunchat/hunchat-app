import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Icon } from "react-native-elements";

import {
  CameraHeader,
  CameraBottomBar,
  CameraTimeBar,
} from "../components/Camera";
import {
  setOnboardingVideoBio,
  setPreviewOnboardingVideoBio,
} from "../ducks/onboardingAddVideoBioSlice";
import {
  setEditBioVideo,
  setEditBioVideoPreview,
} from "../ducks/editProfileSlice";
import { setNewPostVideo } from "../ducks/newPostSlice";
import { Colors } from "../styles";

const { height } = Dimensions.get("window");

class EditProfileBioVideoCameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      hasMediaPermission: null,
      ref: null,
      flashMode: Camera.Constants.FlashMode.off,
      type: Camera.Constants.Type.back,
      video: null,

      duration: 0, // recording duration in ms.
      start: 0,
      isOn: false,
    };

    this.cameraRef = React.createRef();

    this.requestCameraPermission = this.requestCameraPermission.bind(this);
    this.requestMediaPermission = this.requestMediaPermission.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.reverseCamera = this.reverseCamera.bind(this);
    this.onHandleFlashMode = this.onHandleFlashMode.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.requestCameraPermission();
    this.requestMediaPermission();
  }

  async requestCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async requestMediaPermission() {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    this.setState({ hasMediaPermission: status === "granted" });
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
    let video = await this.cameraRef.current.recordAsync({
      quality: "2160p",
      mute: false,
    });

    const asset = await MediaLibrary.createAssetAsync(video.uri);
    const extendedAsset = await MediaLibrary.getAssetInfoAsync(asset);

    if (this.props.route.params.action === "editProfile") {
      this.props.setEditBioVideo({
        file: {
          uri: extendedAsset.localUri,
          name: extendedAsset.filename,
          type: asset.mediaType,
        },
        fileUrl: asset.uri,
        duration: asset.duration,
        height: asset.height,
        width: asset.width,
      });
    } else if (this.props.route.params.action === "addBioVideo") {
      this.props.setOnboardingVideoBio({
        file: {
          uri: extendedAsset.localUri,
          name: extendedAsset.filename,
          type: asset.mediaType,
        },
        fileUrl: asset.uri,
        duration: asset.duration,
        height: asset.height,
        width: asset.width,
      });
    } else if (this.props.route.params.action === "addPost") {
      this.props.setNewPostVideo({
        file: {
          uri: extendedAsset.localUri,
          name: extendedAsset.filename,
          type: asset.mediaType,
        },
        fileUrl: asset.uri,
        duration: asset.duration,
        height: asset.height,
        width: asset.width,
      });
    }
  }

  async stopRecording() {
    this.cameraRef.current.stopRecording();
    this.stopTimer();
    if (this.props.route.params.action === "editProfile") {
      this.props.navigation.goBack();
    } else if (this.props.route.params.action === "addBioVideo") {
      this.props.navigation.goBack();
    } else if (this.props.route.params.action === "addPost") {
      this.props.navigation.navigate("AddPostStack", { screen: "AddPost" });
    }

    this.resetTimer();
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
      isOn: true,
    });
    this.timer = setInterval(
      () =>
        this.setState({
          duration: Date.now() - this.state.start,
        }),
      100
    );
  }

  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }

  resetTimer() {
    this.setState({ duration: 0, start: 0 });
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return <View />;
    }

    if (this.state.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <CameraTimeBar duration={this.state.duration} />
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
  setOnboardingVideoBio,
  setEditBioVideo,
  setNewPostVideo,
};

export default withNavigation(
  connect(null, mapDispatchToProps)(EditProfileBioVideoCameraScreen)
);
