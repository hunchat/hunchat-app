import React from "react";
import { withNavigation } from "react-navigation";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Post from "../components/Post";
import { makeGetPost } from "../ducks/postsSlice";

const { height } = Dimensions.get("window");

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable
            style={styles.goBack}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </Pressable>
        </View>
        <Post id={this.props.route.params.postId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    elevation: 4,
    zIndex: 100,
    height: 0.1 * height,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  goBack: {
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default withNavigation(PostScreen);
