import React from "react";
import { connect } from "react-redux";
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
  Text,
} from "react-native";

import { SEARCH_BAR_HEIGHT } from "./ExploreSearchBar";
import { Colors } from "../../styles";

const width = Dimensions.get("window");

const LIST_TAG_HEIGHT = 30;
const EXPLORE_LISTS_SELECTOR_PADDING_VERTICAL = 10;
export const EXPLORE_LISTS_SELECTOR_HEIGHT =
  LIST_TAG_HEIGHT + 2 * EXPLORE_LISTS_SELECTOR_PADDING_VERTICAL;

const lists = [
  {
    id: "123",
    name: "All topics",
  },
  {
    id: "234",
    name: "Design",
  },
  {
    id: "345",
    name: "Sports",
  },
  {
    id: "456",
    name: "Coding",
  },
  {
    id: "567",
    name: "Baking",
  },
  {
    id: "678",
    name: "Architecture",
  },
  {
    id: "789",
    name: "Science",
  },
  {
    id: "890",
    name: "Politics",
  },
];

const ListTag = ({ name }) => {
  return (
    <Pressable
      style={[
        listTagStyles.container,
        { backgroundColor: name === "All topics" ? "white" : Colors.darkBackground },
      ]}
    >
      <Text style={{ color: name === "All topics" ? "black" : "white" }}>
        {name}
      </Text>
    </Pressable>
  );
};

const listTagStyles = StyleSheet.create({
  container: {
    height: LIST_TAG_HEIGHT,
    marginHorizontal: 3,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 7,
    justifyContent: "center",
  },
});

const ExploreListsSelector = ({ selectedList }) => {
  const renderItem = ({ item }) => {
    const isSelected = item.name === selectedList;
    return <ListTag name={item.name} isSelected={isSelected} />;
  };

  const keyExtractor = (item) => item.id;

  return (
    <FlatList
      style={styles.container}
      data={lists}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: SEARCH_BAR_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: Colors.darkBackground,
    paddingVertical: EXPLORE_LISTS_SELECTOR_PADDING_VERTICAL,
    paddingHorizontal: 5,
  },
});

export default ExploreListsSelector;
