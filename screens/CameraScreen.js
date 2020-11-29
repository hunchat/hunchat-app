import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';

import { setVideoUri } from '../ducks/newPostSlice';


class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      hasCameraRollPermission: null,
      ref: null,
      type: Camera.Constants.Type.back,
      video: null,
    }

    this.cameraRef = React.createRef();

    this.requestCameraPermission = this.requestCameraPermission.bind(this);
    this.requestCameraRollPermission = this.requestCameraRollPermission.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.reverseCamera = this.reverseCamera.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

  async requestCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async startRecording() {
    let video = await this.cameraRef.current.recordAsync();
    this.props.setVideoUri(video.uri);
  }

  async stopRecording() {
    this.cameraRef.current.stopRecording();
    this.props.navigation.navigate("AddVideoStack", { screen: "VideoEdit"});
  }

  reverseCamera() {
    this.setState((state) => ({
      type:
        state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    }))
  }

  async requestCameraRollPermission() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    this.setState({ hasCameraRollPermission: status === 'granted' });
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setState({video: result.uri});
    }
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
        <Camera style={styles.camera} ref={this.cameraRef} type={this.state.type}>
          <View style={styles.picture}>
          </View>
        </Camera>
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={this.pickImage} styles={styles.gallery}>
            <Icon name="image-multiple" type="material-community" color="black" size={35} />
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPressIn={this.startRecording}
            onPressOut={this.stopRecording}
          >
            <View style={styles.captureButton}/>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={this.reverseCamera} styles={styles.reverse}>
            <Icon name="crop" type="material" color="black" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    )
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
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.1,
    backgroundColor: '#e9e9e9',
    paddingHorizontal: 10,
  },
  captureButton: {
    bottom: 25,
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderWidth: 4,
    borderRadius: 60,
    borderColor: "black",
  },
})


const mapDispatchToProps = {
    setVideoUri,
}

export default withNavigation(connect(
  null,
  mapDispatchToProps
)(CameraScreen));