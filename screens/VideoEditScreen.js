import React from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';


class VideoEditScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={{uri: this.props.uri}}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          isLooping
          style={styles.video}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  }
})


const mapStateToProps = (state) => ({
  uri: state.newPost.uri,
})


export default withNavigation(connect(
  mapStateToProps,
)(VideoEditScreen));
