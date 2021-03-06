import React from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { ListPosts, ListPostsHeader } from "../components/Lists";
import { makeGetList } from "../ducks/listsSlice";

function ListPostsScreen({
  id,
  navigation,
  name,
  postsIds,
  initialScrollIndex,
}) {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ListPostsHeader name={name} />
      <ListPosts
        id={id}
        postsIds={postsIds}
        initialScrollIndex={initialScrollIndex}
      />
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
      initialScrollIndex: ownProps.route.params.initialScrollIndex,
    };
  };
};

export default withNavigation(connect(makeMapStateToProps)(ListPostsScreen));
