import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { StackActions } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from "expo-linear-gradient";

import { postCreateThunk } from "../ducks/newPostSlice";
import { Colors } from "../styles";

const { width } = Dimensions.get("window");

const VIDEO_PREVIEW_WIDTH = 0.35 * width;
const VIDEO_PREVIEW_HEIGHT = 1.77 * VIDEO_PREVIEW_WIDTH;

class AddPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
    };

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status === "fulfilled") {
        // const popAction = StackActions.pop(2);
        // this.props.navigation.pop(popAction); // Go back twice
        this.props.navigation.goBack();
      }
    }
  }

  onChangeDescription(text) {
    this.setState({ description: text });
  }

  onSubmit() {
    this.props.postCreateThunk({
      video: this.props.video,
      commentTo: this.props.commentTo,
      description: this.state.description,
    });
  }

  render() {
    let fileUrl;
    if (this.props.video) {
      fileUrl = this.props.video.fileUrl;
    } else {
      fileUrl = null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </Pressable>
        </View>

        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
          extraHeight={40}
          extraScrollHeight={70}
          keyboardOpeningTime={80}
        >

          {/* Start preview */}
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.previewText}>Preview</Text>
            <View style={styles.preview}>
              <Video
                source={{ uri: fileUrl }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping
                style={styles.video}
              />
            </View>
          </View>
          {/* End preview*/}

          <View style={{ width: 0.8 * width }}>
            { /* Start description */}
            <Pressable
              style={styles.descriptionContainer}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                Write caption
              </Text>
              <TextInput
                ref={(input) => {
                  this.description = input;
                }}
                value={this.state.description}
                onChangeText={(text) => this.onChangeDescription(text)}
                style={styles.textInput}
                textContentType="none"
                placeholder="Enter text here..."
                placeholderTextColor="lightgrey"
                autoCapitalize="none"
                multiline
              />
            </Pressable>
            { /* End description */}
          </View>
        </KeyboardAwareScrollView>

        {/* Start submit */}
        {this.props.status==="pending" ? (
          <View style={styles.button}>
            <LinearGradient
              colors={["#FF8400", "#FF9D33"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <ActivityIndicator size="small" color="white" />
            </LinearGradient>
          </View>
        ) : (
          <Pressable style={styles.button} onPress={this.onSubmit}>
            <LinearGradient
              colors={["#FF8400", "#FF9D33"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 21,
                }}
              >
                Chat
              </Text>
            </LinearGradient>
          </Pressable>
        )}
        {/* End submit */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  header: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  preview: {
    marginVertical: 10,
    height: VIDEO_PREVIEW_HEIGHT,
    width: VIDEO_PREVIEW_WIDTH,
  },
  previewText: {
    textAlign: "center",
    color: "white",
  },
  video: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#898989",
  },
  textInput: {
    flex: 1,
    color: "#C1C1C1",
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: 0.5 * width - 74,
    shadowColor: "#AE5B02",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.63,
    shadowRadius: 5,

    elevation: 11,
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
});

const mapStateToProps = (state) => ({
  video: state.newPost.video,
  commentTo: state.newPost.commentTo,
  status: state.newPost.formSubmittingStatus,
});

const mapDispatchToProps = {
  postCreateThunk,
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(AddPostScreen));
