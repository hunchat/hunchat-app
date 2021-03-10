import React from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { View, StyleSheet, Text } from "react-native";

import Thread, { ThreadHeader } from "../components/Thread";
import { makeGetPostThreadPostsIds, threadGetThunk } from "../ducks/postsSlice";

class ThreadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    }
  }

  componentDidMount() {
    this.props.threadGetThunk(this.props.route.params.postId);
  }

  setCurrentIndex = (currentIndex) => {
    this.setState({ currentIndex })
  }

  render() {
    return (
      <View style={styles.container}>
        <ThreadHeader currentIndex={this.state.currentIndex} threadLength={this.props.postsIds.length} />
        <Thread postsIds={this.props.postsIds} onChangeCurrentIndex={this.setCurrentIndex}/>
      </View>
    );
  }
}

ThreadScreen.defaultProps = {
  postsIds: [],
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
  return (mapStateToProps = (state, ownProps) => {
    return {
      postsIds: getPostThreadPostsIds(state, {
        postId: ownProps.route.params.postId,
      }),
    };
  });
};

const mapDispatchToProps = {
  threadGetThunk,
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(withNavigation(ThreadScreen));
