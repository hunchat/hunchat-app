import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

import { AddPostButton } from "../components/AddPost";
import { Header } from "../components/Header";
import { Lists } from "../components/Lists";

class ListsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={"Your Lists"} navigation={this.props.navigation} />
        <Lists navigation={this.props.navigation} />
        <AddPostButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withNavigation(ListsScreen);
