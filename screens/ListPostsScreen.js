import React from "react";
import { View, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { ListPosts, ListPostsHeader } from "../components/Lists";
import { makeGetList } from "../ducks/listsSlice";

function ListPostsScreen({ id, navigation, name, postsIds }) {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="dark-content" />
      <ListPostsHeader name={name} />
      <ListPosts id={id} postsIds={postsIds} />
    </View>
  );
}

const makeMapStateToProps = (state) => {
  const getList = makeGetList();
  return function mapStateToProps(state, ownProps) {
    let list = getList(state, { listId: ownProps.route.params.list.id });
    return {
      id: ownProps.route.params.list.id,
      name: list.name,
      postsIds: list.posts,
    };
  };
};

export default withNavigation(connect(makeMapStateToProps)(ListPostsScreen));
