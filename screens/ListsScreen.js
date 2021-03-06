import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

import { Header } from "../components/Header";
import { AddPostButton } from "../components/AddPost";
import {
  ListPostsPreview,
  ListsSelector,
  LISTS_SELECTOR_HEIGHT,
} from "../components/Lists";
import { makeGetList, getListPostsThunk } from "../ducks/listsSlice";
import { Colors } from "../styles";

function ListsScreen({ navigation, postsIds, getListPostsThunk }) {
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    getListPostsThunk();
  }, [postsIds]);

  const diffClamp = Animated.diffClamp(scrollY, 0, LISTS_SELECTOR_HEIGHT);
  const translateY = diffClamp.interpolate({
    inputRange: [0, LISTS_SELECTOR_HEIGHT],
    outputRange: [0, -LISTS_SELECTOR_HEIGHT],
    extrapolate: "clamp",
  });

  const handleScroll = (e) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
  };

  return (
    <View style={styles.container}>
      <Header title={"Your lists"} />
      <Animated.View
        style={{
          transform: [{ translateY }, { perspective: 1000 }],
          elevation: 3,
          zIndex: 80,
        }}
      >
        <ListsSelector selectedList="All Lists" />
      </Animated.View>
      <Animated.View style={{ flex: 20000 }}>
        <ListPostsPreview
          id="1"
          postsIds={postsIds}
          handleScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: (event) => {
                handleScroll(event);
              },
            }
          )}
          marginTop={LISTS_SELECTOR_HEIGHT}
        />
      </Animated.View>
      <AddPostButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
});

const makeMapStateToProps = (state) => {
  const getList = makeGetList();
  return function mapStateToProps(state, ownProps) {
    let list = getList(state, { listId: "1" });
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
  connect(makeMapStateToProps, mapDispatchToProps)(ListsScreen)
);
