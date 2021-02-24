import React from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../styles";

const EditProfileHeader = ({ onSubmit, status }) => {
  const navigation = useNavigation();

  const handlePressGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.goBack} onPress={handlePressGoBack}>
        <Ionicons name="ios-arrow-back" size={24} color="white" />
      </Pressable>
      <Text style={styles.title}>Edit Profile</Text>
      {status === "pending" ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <Pressable onPress={onSubmit}>
          <Text style={styles.save}>Save</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goBack: {},
  title: {
    color: "white",
    fontSize: 21,
    fontWeight: "600",
  },
  save: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "600",
  },
});

const mapStateToProps = (state) => ({
  status: state.editProfile.formSubmittingStatus,
});

export default connect(mapStateToProps)(EditProfileHeader);
