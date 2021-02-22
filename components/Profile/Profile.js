import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { Video } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';

import { makeGetUser } from "../../ducks/usersSlice";
import { formatDateJoined } from "../../utils/dates";

const authorUsernameMaxCharacters = 13;

const Profile = ({
  id,
  username,
  name,
  email,
  image,
  imageUrl,
  bio,
  bioVideo,
  location,
  dateJoined,
  link,
}) => {
  const navigation = useNavigation();

  const handlePressLink = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert(`Something went wrong. Can't open this link: ${link}`);
    }
  }, [link]);

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: bioVideo.fileUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.45 }}
        locations={[0.8, 1]}
        style={styles.gradient}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "transparent",
          padding: 15,
          alignItems: "center",
        }}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>

        {/* Start bio */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.bio}>
            {bio}
          </Text>
        </View>
        {/* Start bio */}

        <View style={{ width: "100%", alignItems: "flex-start"}}>
          <Text
            style={{
              textAlign: "left",
              color: "white",
            }}
          >
            Added to 253 Lists
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View>
            {location && <Text style={styles.location}>{location}</Text>}
            <Text style={styles.createdAt}>Joined {formatDateJoined(dateJoined)}</Text>
          </View>

          {link && <Pressable onPress={handlePressLink}>
            <Text style={styles.link}>{link}</Text>
          </Pressable>}
        </View>

        <View style={{ alignItems: "center"}}>
          <MaterialIcons name="keyboard-arrow-down" size={50} color="white" />
        </View>

        {/* Start follow button */}
        {/*<Pressable style={styles.followButton}>
          <LinearGradient
            colors={["#FF8400", "#FF9D33"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.followButtonGradient}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              Follow
            </Text>
          </LinearGradient>
        </Pressable>*/}
        {/* End follow button */}

      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  video: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  name: {
    color: "white",
    fontSize: 21,
    fontWeight: "600",
  },
  username: {
    color: "white",
  },
  bio: {
    color: "white",
    fontWeight: "500",
  },
  location: {
    color: "white",
  },
  createdAt: {
    color: "white",
  },
  link: {
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
  },
  // followButton: {
  //   marginTop: 10,
  //   shadowColor: "#AE5B02",
  //   shadowOffset: {
  //     width: 2,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.63,
  //   shadowRadius: 5,
  //
  //   elevation: 11,
  // },
  // followButtonGradient: {
  //   borderRadius: 10,
  //   paddingVertical: 13,
  //   paddingHorizontal: 40,
  //   alignItems: "center",
  // },
};

const makeMapStateToProps = () => {
  const getUser = makeGetUser();
  return function mapStateToProps(state, ownProps) {
    return {...getUser(state, { userId: ownProps.userId })}
  }
};

export default connect(makeMapStateToProps)(Profile);
