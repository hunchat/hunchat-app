import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Linking,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { Video } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { makeGetUser } from "../../ducks/usersSlice";
import { formatDateJoined } from "../../utils/dates";
import { Colors } from "../../styles";

const authorUsernameMaxCharacters = 13;

const Profile = ({
  id,
  username,
  name,
  email,
  image,
  imageUrl,
  bio,
  bioVideo = {},
  location,
  dateJoined,
  link,
}) => {
  const { fileUrl = null, posterUrl = null, duration = 0 } = bioVideo;

  const [isVisibleAllInfo, setIsVisibleAllInfo] = useState(false);

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

  const onPressSeeMoreInfo = () => setIsVisibleAllInfo(true);
  const onPressSeeLessInfo = () => setIsVisibleAllInfo(false);

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: fileUrl }}
        posterSource={{ uri: posterUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        usePoster
        shouldPlay
        isLooping
        style={styles.video}
        posterStyle={{ ...StyleSheet.absoluteFill, resizeMode: "cover" }}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "transparent",
          padding: 15,
          alignItems: "flex-start",
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "transparent"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0.9, 1]}
          style={styles.gradient}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
          />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.username}>@{username}</Text>
          </View>
        </View>

        {/* Start bio */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.bio}>{bio}</Text>
        </View>
        {/* Start bio */}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <View>
            {/* Start link */}
            {link && (
              <Pressable
                onPress={handlePressLink}
                style={{ flexDirection: "row", alignItems: "center", marginVertical: 7 }}
              >
                <Ionicons name="ios-link" size={18} color="white" style={{ marginRight: 7 }} />
                <Text style={styles.link}>{link}</Text>
              </Pressable>
            )}
            {/* End link */}

            {isVisibleAllInfo && (
              <>
                {/* Start following count */}
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 7 }}>
                  <Ionicons name="list" size={18} color="white" style={{ marginRight: 7 }} />
                  <Text
                    style={{
                      textAlign: "left",
                      color: "white",
                    }}
                  >
                    Added to 253 Lists
                  </Text>
                </View>
                {/* End following count */}

                {/* Start joined date */}
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 7 }}>
                  <MaterialIcons name="calendar-today" size={18} color="white" style={{ marginRight: 7 }} />
                  <Text style={styles.createdAt}>
                    Joined {formatDateJoined(dateJoined)}
                  </Text>
                </View>
                {/* End joined date */}

                {/* Start location */}
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 7 }}>
                  <Ionicons name="location-sharp" size={18} color="white" style={{ marginRight: 7 }} />
                  {location && <Text style={styles.location}>{location}</Text>}
                </View>
                {/* End location */}
              </>
            )}
          </View>

          {/* Start more info/less info */}
          <View style={{ marginVertical: 7 }}>
            {isVisibleAllInfo
              ? <Text style={styles.moreInfo} onPress={onPressSeeLessInfo} hitSlop={7}>Less info</Text>
              : <Text style={styles.moreInfo} onPress={onPressSeeMoreInfo} hitSlop={7}>More info</Text>
            }
          </View>
          {/* End more info/less info */}
        </View>

        <View style={{ alignItems: "center", width: "100%" }}>
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
    backgroundColor: Colors.darkBackground,
  },
  video: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  image: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "white",
    marginRight: 12,
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
  moreInfo: {
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
    return { ...getUser(state, { userId: ownProps.userId }) };
  };
};

export default connect(makeMapStateToProps)(Profile);
