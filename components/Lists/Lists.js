import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";

import ListPreview from "./ListPreview";

import { getAllListsIds } from "../../ducks/listsSlice";
import { Colors } from "../../styles";

class Lists extends React.Component {
  constructor(props) {
    super(props);
  }

  keyExtractor = (item) => item;

  renderItem = ({ item }) => (
    <ListPreview id={item} navigation={this.props.navigation} />
  );

  render() {
    return (
      <FlatList
        data={this.props.listsIds}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        style={styles.container}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.darkBackground,
  },
  list: {
    justifyContent: "space-around",
  },
  column: {
    flexShrink: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    listsIds: getAllListsIds(state),
  };
};

export default connect(mapStateToProps)(Lists);
