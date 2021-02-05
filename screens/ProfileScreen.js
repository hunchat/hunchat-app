import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withNavigation(ProfileScreen);
