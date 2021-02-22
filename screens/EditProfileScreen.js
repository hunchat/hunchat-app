import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { withNavigation } from "react-navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  EditProfileHeader,
  EditProfileBioVideo,
  EditProfileImage,
} from "../components/EditProfile";
import { makeGetUser, retrieveUserThunk } from "../ducks/usersSlice";
import { updateUserThunk, updateUserBioVideoThunk, updateUserImageThunk } from "../ducks/editProfileSlice";
import { Colors } from "../styles";

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      image: null,
      imageUrl: null,
      bio: "",
      bioVideo: null,
      location: "",
      link: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.id) {
      this.props.retrieveUserThunk(this.props.id);
    }

    // Populate form data
    this.setState(state => {
      return {
        name: this.props.name,
        username: this.props.username,
        bio: this.props.bio,
        bioVideo: this.props.bioVideo,
        location: this.props.location,
        image: this.props.image,
        imageUrl: this.props.imageUrl,
        link: this.props.link,
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.retrieveUserThunk(this.props.id);
    }
    if (this.props.newBioVideo !== prevProps.newBioVideo) {
      if (this.props.newBioVideo) {
        this.setState({ bioVideo: this.props.newBioVideo })
      }
    }
    if(this.props.status !== prevProps.status) {
      if (this.props.status == "fulfilled") {
        this.props.navigation.goBack();
      }
    }
  }

  onChangeImage = ({ url, file }) => {
    this.setState({ imageUrl: url, image: file });
  }

  onChangeName = (text) => {
    this.setState({ name: text });
  }

  onChangeUsername = (text) => {
    this.setState({ username: text });
  }

  onChangeBio= (text) => {
    this.setState({ bio: text });
  }

  onChangeLocation = (text) => {
    this.setState({ location: text });
  }

  onChangeLink = (text) => {
    this.setState({ link: text });
  }

  onSubmit() {
    let newData = {};

    if (this.props.newBioVideo) {
      let newBioVideoData = {};
      newBioVideoData['bio_video'] = {
        file: this.props.newBioVideo.file,
        duration: this.props.newBioVideo.duration,
        height: this.props.newBioVideo.height,
        width: this.props.newBioVideo.width,
      };

      this.props.updateUserBioVideoThunk(newBioVideoData);
    }

    if (this.state.imageUrl !== this.props.imageUrl) {
      let newImageData = {};
      newImageData['image'] = {
        "file": this.state.image,
      }

      this.props.updateUserImageThunk(newImageData);
    }

    if (this.state.name !== this.props.name) {
      newData['name'] = this.state.name
    }

    if (this.state.username !== this.props.username) {
      newData['username'] = this.state.username
    }

    if (this.state.bio !== this.props.bio) {
      newData['bio'] = this.state.bio
    }

    if (this.state.location !== this.props.location) {
      newData['location'] = this.state.location
    }

    if (this.state.link !== this.props.link) {
      newData['link'] = this.state.link
    }

    if (Object.keys(newData).length !== 0) {
      this.props.updateUserThunk(newData)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <EditProfileHeader onSubmit={this.onSubmit}/>
        <KeyboardAwareScrollView
          style={styles.container}
          extraHeight={40}
          extraScrollHeight={70}
          keyboardOpeningTime={80}
        >
          <EditProfileBioVideo {...this.state.bioVideo} />

          <View style={styles.fieldContainer}>
            <EditProfileImage url={this.state.imageUrl} onChangeImage={this.onChangeImage}/>
          </View>

          {/* Start edit name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={this.state.name}
              onChangeText={this.onChangeName}
              style={styles.textInput}
              placeholder="Enter your name"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
            />
          </View>
          {/* End edit name */}

          {/* Start username */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              value={this.state.username}
              onChangeText={this.onChangeUsername}
              style={styles.textInput}
              placeholder="Enter a username"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
            />
          </View>
          {/* End username */}

          {/* Start bio */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              value={this.state.bio}
              onChangeText={this.onChangeBio}
              style={styles.textInput}
              placeholder="Write your bio"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
              multiline
            />
          </View>
          {/* End bio */}

          {/* Start location */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              value={this.state.location}
              onChangeText={this.onChangeLocation}
              style={styles.textInput}
              placeholder="Enter your location"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
            />
          </View>
          {/* End location */}

          {/* Start link */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Link</Text>
            <TextInput
              value={this.state.link}
              onChangeText={this.onChangeLink}
              style={styles.textInput}
              placeholder="Enter a link"
              placeholderTextColor="lightgrey"
              autoCapitalize="none"
            />
          </View>
          {/* End link */}

          {/* Start password */}
          <View style={styles.fieldContainer}>
            <Text
              style={[
                styles.label,
                {textDecorationLine: "underline"}
              ]}
            >
              Change password
            </Text>
          </View>
          {/* End password */}

          <View style={{ height: 30 }} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
  fieldContainer: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  label: {
    color: "white",
    fontWeight: "600",
  },
  textInput: {
    color: "#C1C1C1",
  },
});


const makeMapStateToProps = () => {
  const getUser = makeGetUser();
  const mapStateToProps = (state) => {
    let user = getUser(state, { userId: state.users.currentUserId });
    return {
      ...user,
      newBioVideo: state.editProfile.bioVideo,
      status: state.editProfile.formSubmittingStatus,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = {
  retrieveUserThunk,
  updateUserThunk,
  updateUserBioVideoThunk,
  updateUserImageThunk,
};

export default withNavigation(
  connect(makeMapStateToProps, mapDispatchToProps)(EditProfileScreen)
);
