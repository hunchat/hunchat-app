import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../styles";

const SEARCH_BAR_PADDING_VERTICAL = 10;
const ICON_SIZE = 24;
export const SEARCH_BAR_HEIGHT = 2 * SEARCH_BAR_PADDING_VERTICAL + ICON_SIZE;

const { width } = Dimensions.get("window");

const ExploreSearchBar = () => {
  const textInput = useRef(null);
  const [value, onChangeText] = useState("");

  function handlePress() {
    textInput.current.focus();
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "black" : Colors.darkBackground,
          },
          styles.searchBar,
        ]}
      >
        <Ionicons name="ios-search-outline" size={ICON_SIZE} color={"grey"} />
        <TextInput
          ref={textInput}
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="Type to explore new topics..."
          placeholderTextColor={"grey"}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.darkBackground,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  searchBar: {
    borderRadius: 10,
    paddingVertical: SEARCH_BAR_PADDING_VERTICAL,
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  textInput: {
    marginLeft: 5,
    color: "white",
  },
});
export default ExploreSearchBar;
