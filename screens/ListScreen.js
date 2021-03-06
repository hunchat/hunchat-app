import React from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { Header } from "../components/Header";
import { ListPostsPreview } from "../components/Lists";
import { makeGetList, getListPostsThunk } from "../ducks/listsSlice";

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getListPostsThunk();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title={this.props.name} navigation={this.props.navigation} />
        <ListPostsPreview
          id={this.props.route.params.listId}
          postsIds={this.props.postsIds}
        />
      </View>
    );
  }
}

const makeMapStateToProps = (state) => {
  const getList = makeGetList();
  return function mapStateToProps(state, ownProps) {
    let list = getList(state, { listId: ownProps.route.params.listId });
    return {
      name: list.name,
      postsIds: list.posts,
    };
  };
};

const mapDispatchToProps = {
  getListPostsThunk,
};

export default withNavigation(
  connect(makeMapStateToProps, mapDispatchToProps)(ListScreen)
);
