import React from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from "../../styles";

function Header({ title, currentUserId }) {
  const navigation = useNavigation();

  const onPressGoToProfile = () => {
    navigation.push("ProfileStack", {
      screen: "Profile",
      params: {
        userId: currentUserId,
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.navigation}>
        <Pressable onPress={onPressGoToProfile}>
          <MaterialIcons name="person-outline" size={35} color={Colors.greyIcons} />
        </Pressable>
        <MaterialCommunityIcons name="email-outline" size={35} color={Colors.greyIcons} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 5,
    backgroundColor: "black",
    elevation: 4,
    zIndex: 100,
  },
  titleContainer: {
    flex: 3,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  navigation: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

const mapStateToProps = (state) => ({
  currentUserId: state.users.currentUserId,
})

export default connect(mapStateToProps)(Header);
