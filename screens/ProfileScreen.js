import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { getStatusBarHeight } from "react-native-status-bar-height";

import Profile, { ProfileHeader } from "../components/Profile";
import { PostPreview, POST_PREVIEW_HEIGHT, POST_PREVIEW_WIDTH } from "../components/Post";
import { makeGetUser, retrieveUserThunk } from "../ducks/usersSlice";
import { makeGetList, getListPostsThunk } from "../ducks/listsSlice";

const { height } = Dimensions.get("window");
export const PROFILE_HEIGHT = height - getStatusBarHeight();
const NUM_COLUMNS = 2;

const snapToOffsets = [0, PROFILE_HEIGHT];

function ProfileScreen({
  navigation,
  route,
  postsIds,
  retrieveUserThunk,
  getListPostsThunk,
}) {
  const flatListRef = useRef(null);

  useEffect(() => {
    retrieveUserThunk(route.params.userId);
    getListPostsThunk();
  }, [route.params.userId]);

  const keyExtractor = (item) => item;

  const renderItem = ({ item }) => <PostPreview id={item} />;

  const getItemLayout = (data, index) => ({
    length: POST_PREVIEW_HEIGHT,
    offset: POST_PREVIEW_WIDTH * Math.floor(index / NUM_COLUMNS),
    index,
  });

  const scrollToList = () => {
    flatListRef.current.scrollToOffset({ offset: PROFILE_HEIGHT });
  };

  return (
    <Animated.View style={styles.container}>
      <ProfileHeader />
      <Animated.FlatList
        ref={flatListRef}
        scrollEventThrottle={1}
        data={postsIds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={21}
        numColumns={NUM_COLUMNS}
        bounces={false}
        decelerationRate="fast"
        snapToOffsets={snapToOffsets}
        snapToEnd={false}
        ListHeaderComponent={<Profile userId={route.params.userId} onPressArrowDown={scrollToList}/>}
        style={styles.flatList}
        contentContainerStyle={styles.list}
        ListHeaderComponentStyle={{ height: PROFILE_HEIGHT }}
        columnWrapperStyle={styles.column}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  flatList: {
    flex: 1,
  },
  list: {
    justifyContent: "space-around",
  },
  column: {
    flexShrink: 1,
  },
});

const makeMapStateToProps = (state) => {
  const getList = makeGetList();
  return function mapStateToProps(state, ownProps) {
    let list = getList(state, { listId: "1" });
    return {
      postsIds: list.posts,
    };
  };
};

const mapDispatchToProps = {
  retrieveUserThunk,
  getListPostsThunk,
};

export default withNavigation(
  connect(makeMapStateToProps, mapDispatchToProps)(ProfileScreen)
);
