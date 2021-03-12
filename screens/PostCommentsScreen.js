import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { PostsPreview } from "../components/Post";
import { makeGetPostCommentsIds, getPostCommentsThunk } from "../ducks/postsSlice";
import { STATUS_BAR_HEIGHT } from "../constants";
import { Colors } from "../styles";

class PostCommentsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPostCommentsThunk(this.props.route.params.postId);
  }

  onPressGoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Start header */}
        <View style={styles.header}>
          <Pressable style={styles.goBack} onPress={this.onPressGoBack}>
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </Pressable>
          <View style={{ flex: 4, alignItems: "center" }}>
            <Text style={styles.title}>Responses to this video</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        {/* End header */}

        <PostsPreview
          postsIds={this.props.postCommentsIds}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: Colors.darkBackground,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goBack: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
  },
});

const makeMapStateToProps = (state) => {
  const getPostCommentsIds = makeGetPostCommentsIds();
  return function mapStateToProps(state, ownProps) {
    let postCommentsIds = getPostCommentsIds(state, { postId: ownProps.route.params.postId });
    return { postCommentsIds };
  };
};

const mapDispatchToProps = {
  getPostCommentsThunk,
};

export default withNavigation(
  connect(makeMapStateToProps, mapDispatchToProps)(PostCommentsScreen)
);
