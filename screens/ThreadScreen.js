import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { View, StyleSheet, Text } from "react-native";

import Thread, { ThreadHeader } from "../components/Thread";
import { makeGetPostThreadPostsIds, threadGetThunk } from "../ducks/postsSlice";

class ThreadScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.threadGetThunk(this.props.route.params.postId);
  }

  render() {
    return (
      <View style={styles.container}>
        <ThreadHeader currentIndex={1} threadLength={8} />
        <Thread postsIds={this.props.postsIds} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06050B",
    justifyContent: "center",
  },
});

const makeMapStateToProps = () => {
  const getPostThreadPostsIds = makeGetPostThreadPostsIds();
  return mapStateToProps = (state, ownProps) => {
    return {
      postsIds: getPostThreadPostsIds(state, { postId: ownProps.route.params.postId }),
    }
  }
};

const mapDispatchToProps = {
  threadGetThunk,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(withNavigation(ThreadScreen));
