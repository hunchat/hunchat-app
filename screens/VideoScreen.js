import React from "react";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { View } from "react-native";

import { VideoPost } from "../components/Video";
import { makeGetVideo } from "../ducks/videosSlice";

class VideoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <VideoPost {...this.props.video} navigation={this.props.navigation} />
      </View>
    );
  }
}

const makeMapStateToProps = (state) => {
  const getVideo = makeGetVideo();
  return function mapStateToProps(state, ownProps) {
    let video = getVideo(state, { videoId: ownProps.route.params.video.id });
    return {
      video: video,
    };
  };
};

export default withNavigation(connect(makeMapStateToProps)(VideoScreen));
