import React from "react";
import { View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { Header } from "../components/Header";
import { ListPostsPreview } from "../components/Lists";
import { makeGetList, getListPostsThunk } from "../ducks/listsSlice";
import { Colors } from "../styles";

class ListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getListPostsThunk();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={this.props.name} navigation={this.props.navigation} />
        <ListPostsPreview
          id={this.props.route.params.listId}
          postsIds={this.props.postsIds}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  }
})

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
