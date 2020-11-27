import React from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';
import { Icon } from 'react-native-elements';


class VideoEditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onPressRightArrow = this.onPressRightArrow.bind(this);
  }

  onPressRightArrow() {
    this.props.navigation.navigate("AddVideoStack", { screen: "AddVideo" });
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
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={this.onPressRightArrow}>
            <Icon name="arrow-forward" type="material" color="black" size={35} />
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
  video: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.1,
    backgroundColor: '#e9e9e9',
    paddingHorizontal: 10,
  }
})


const mapStateToProps = (state) => ({
  uri: state.newPost.uri,
})


export default withNavigation(connect(
  mapStateToProps,
)(VideoEditScreen));
