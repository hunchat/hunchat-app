import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { getStatusBarHeight } from "react-native-status-bar-height";

import Profile, { ProfileHeader } from "../components/Profile";
import { PostPreview } from "../components/Post";
import { makeGetUser, retrieveUserThunk } from "../ducks/usersSlice";

const { height } = Dimensions.get("window");
export const PROFILE_HEIGHT = height - getStatusBarHeight();

function ProfileScreen({ navigation, route, postsIds, retrieveUserThunk }) {
  useEffect(() => {
    retrieveUserThunk(route.params.userId);
  }, [route.params.userId]);

  const keyExtractor = (item) => item;

  const renderItem = ({ item }) => <PostPreview id={item} />;

  return (
    <Animated.View style={styles.container}>
      <ProfileHeader />
      <Animated.FlatList
        scrollEventThrottle={1}
        data={postsIds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.column}
        // onScroll={handleScroll}
        bounces={false}
        ListHeaderComponent={<Profile userId={route.params.userId} />}
        ListHeaderComponentStyle={{ height: PROFILE_HEIGHT }}
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

const makeMapStateToProps = () => {
  const mapStateToProps = (state) => {
    return {
      postsIds: ["1", "2", "3", "4", "5"],
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = {
  retrieveUserThunk,
};

export default withNavigation(
  connect(makeMapStateToProps, mapDispatchToProps)(ProfileScreen)
);
