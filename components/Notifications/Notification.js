import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import { Colors } from "../../styles";

const NOTIFICATION_OBJECT_WIDTH = 45;
const NOTIFICATION_OBJECT_HEIGHT = 1.34 * NOTIFICATION_OBJECT_WIDTH;

const Notification = ({ id }) => {
  return (
    <Pressable style={styles.container}>
      <Image
        source={Object({
          uri:
            "https://instagram.flis5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/37811221_218343765548379_8242830384702685184_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&_nc_ohc=YMlw92AGb6wAX8y3plx&tp=1&oh=2d55648e9563b01e0c3a341863574067&oe=60430B10",
        })}
        style={styles.actorImage}
      />
      <View style={styles.summary}>
        <Pressable>
          <Text style={styles.actor}>@RickAndrew</Text>
        </Pressable>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text style={styles.activity}>replied to your convo</Text>
          <Text style={styles.createdAt}>2h</Text>
        </View>
      </View>
      <Image
        source={require("../../assets/examples/image-1.png")}
        style={styles.object}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actorImage: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "white",
  },
  actor: {
    color: "white",
    fontWeight: "600",
  },
  summary: {
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  activity: {
    color: "lightgrey",
  },
  createdAt: {
    marginLeft: 10,
    color: "lightgrey",
  },
  object: {
    height: NOTIFICATION_OBJECT_HEIGHT,
    width: NOTIFICATION_OBJECT_WIDTH,
    resizeMode: "cover",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
});

export default Notification;
