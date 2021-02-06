import React from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { Header } from "../components/Header";
import { PostsList } from "../components/Post";

import { makeGetList } from "../ducks/listsSlice";

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title={this.props.name} navigation={this.props.navigation} />
        <PostsList postsIds={this.props.posts} />
      </View>
    );
  }
}

const makeMapStateToProps = (state) => {
  const getList = makeGetList();
  return function mapStateToProps(state, ownProps) {
    let list = getList(state, { listId: ownProps.route.params.list.id });
    return {
      name: list.name,
      posts: list.posts,
    };
  };
};

export default withNavigation(connect(makeMapStateToProps)(ListScreen));
