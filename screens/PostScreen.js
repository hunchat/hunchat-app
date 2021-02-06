import React from "react";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { View } from "react-native";

import Post from "../components/Post";
import { makeGetPost } from "../ducks/postsSlice";

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Post {...this.props.post} navigation={this.props.navigation} />
      </View>
    );
  }
}

const makeMapStateToProps = (state) => {
  const getPost = makeGetPost();
  return function mapStateToProps(state, ownProps) {
    let post = getPost(state, { postId: ownProps.route.params.post.id });
    return {
      post: post,
    };
  };
};

export default withNavigation(connect(makeMapStateToProps)(PostScreen));
