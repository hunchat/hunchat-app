import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Page3 = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("BottomTabs");
  };

  return (
    <View style={styles.container}>
      <View style={{ width: 0.7 * width }}>
        <Text style={styles.title}>You are important.</Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>Extremely important.</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>
            Whenever you see an error in the app, click on this icon, tell us
            what happened and we will fix it.
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "white" }}>Thank you,{"\n"}Enjoy Hunchat.</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={onPress}>
        <Ionicons name="ios-arrow-forward" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "600",
  },
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page3;
