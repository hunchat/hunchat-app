import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { withNavigation } from "react-navigation";

import { Header } from "../components/Header";
import { AddPostButton } from "../components/AddPost";
import {
  ExploreListsSelector,
  EXPLORE_LISTS_SELECTOR_HEIGHT,
  ExploreSearchBar,
  SEARCH_BAR_HEIGHT,
} from "../components/Explore";
import { PostsList } from "../components/Post";

function ExploreScreen({ navigation }) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, EXPLORE_LISTS_SELECTOR_HEIGHT+SEARCH_BAR_HEIGHT);
  const translateY = diffClamp.interpolate({
    inputRange: [0, EXPLORE_LISTS_SELECTOR_HEIGHT+SEARCH_BAR_HEIGHT],
    outputRange: [0, -(EXPLORE_LISTS_SELECTOR_HEIGHT+SEARCH_BAR_HEIGHT)],
    extrapolate: "clamp"
  });

  const handleScroll = (e) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y)
  };

  return (
    <View style={styles.container}>
      <Header title={"Explore"} />
      <Animated.View
        style={{
          transform: [
            { translateY },
            { perspective: 1000 }
          ],
          elevation: 3,
          zIndex: 80,
        }}
      >
        <ExploreSearchBar />
        <ExploreListsSelector selectedList="All topics"/>
      </Animated.View>
      <Animated.View style={{ flex: 20000 }}>
        <PostsList
          postsIds={["1", "2", "3", "4", "5"]}
          handleScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                 }
              }
            }],
            {
              useNativeDriver: true,
              listener: event => {
                handleScroll(event);
              }
            }
          )}
          marginTop={EXPLORE_LISTS_SELECTOR_HEIGHT+SEARCH_BAR_HEIGHT}
        />
      </Animated.View>
      <AddPostButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default withNavigation(ExploreScreen);
