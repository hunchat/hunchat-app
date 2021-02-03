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

const width = Dimensions.get("window");

const LIST_TAG_HEIGHT = 30;
const EXPLORE_LISTS_SELECTOR_PADDING_VERTICAL = 10;
export const EXPLORE_LISTS_SELECTOR_HEIGHT = LIST_TAG_HEIGHT + 2 * EXPLORE_LISTS_SELECTOR_PADDING_VERTICAL;

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
];

const ListTag = ({ name }) => {

  return (
    <Pressable
      style={listTagStyles.container}
    >
      <Text style={{ color: "white"}}>
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
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    backgroundColor: "black",
    paddingVertical: 3,
    paddingHorizontal: 7,
    justifyContent: "center"
  }
})

const ExploreListsSelector = ({
  selectedList,
}) => {
  const renderItem = ({item}) => {
    const isSelected = item.name === selectedList;
    return (
      <ListTag
        name={item.name}
        isSelected={isSelected}
      />
    )
  }

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
  )
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    paddingVertical: EXPLORE_LISTS_SELECTOR_PADDING_VERTICAL,
  }
});

export default ExploreListsSelector;
