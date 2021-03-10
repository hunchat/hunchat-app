import React from "react";
import { withNavigation } from "react-navigation";
import { View, StyleSheet } from "react-native";

import { NotificationsInbox } from "../components/Notifications";
import { Header } from "../components/Header";
import { STATUS_BAR_HEIGHT } from "../constants";
import { Colors } from "../styles";

class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={"Notifications"} />
        <NotificationsInbox
          notificationsIds={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: Colors.darkBackground,
  },
});

export default withNavigation(NotificationsScreen);
