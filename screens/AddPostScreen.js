import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { Icon } from "react-native-elements";

class AddPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      link: "",
    };

    this.onChangeCaptionTextInput = this.onChangeCaptionTextInput.bind(this);
    this.onChangeLinkTextInput = this.onChangeLinkTextInput.bind(this);
  }

  onChangeCaptionTextInput(text) {
    this.setState({ caption: text });
  }

  onChangeLinkTextInput(text) {
    this.setState({ link: text });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.onPressGoBack}>
            <Icon name="arrow-back" type="material" color="black" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.preview}>
          <Text style={styles.previewText}>Preview</Text>
          <Video
            source={{ uri: this.props.uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            isLooping
            style={styles.video}
          />
        </View>
        <View style={styles.form}>
          <View style={styles.addTagsContainer}>
            <Text>Add tags</Text>
          </View>
          <View style={styles.addCaptionContainer}>
            <Text>Add caption</Text>
            <TextInput
              ref={(input) => {
                this.captionTextInput = input;
              }}
              textContentType="none"
              value={this.state.caption}
              onChangeText={(text) => this.onChangeCaptionTextInput(text)}
              onSubmitEditing={() => {
                this.linkTextInput.focus();
              }}
            />
          </View>
          <View style={styles.linkResourcesContainer}>
            <Text>Link resources</Text>
            <TextInput
              ref={(input) => {
                this.linkTextInput = input;
              }}
              textContentType="URL"
              value={this.state.link}
              onChangeText={(text) => this.onChangeLinkTextInput(text)}
            />
          </View>
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={this.onPressRightArrow}
          >
            <Text style={styles.sendButtontext}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  preview: {
    flex: 1,
  },
  previewText: {
    textAlign: "center",
  },
  video: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 30,
  },
  addTagsContainer: {},
  addCaptionContainer: {},
  linkResourcesContainer: {},
  bottomBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.1,
    backgroundColor: "#e9e9e9",
    paddingHorizontal: 10,
  },
  sendButton: {
    height: "70%",
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "grey",
    borderRadius: 10,
    justifyContent: "center",
  },
  sendButtontext: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
});

const mapStateToProps = (state) => ({
  uri: state.newPost.uri,
});

export default withNavigation(connect(mapStateToProps)(AddPostScreen));
