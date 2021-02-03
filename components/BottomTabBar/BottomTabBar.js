import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function renderIcon({ route, focused }) {
  let icon;

  if (route.name === "Explore") {
    icon = focused ? (
      <Icon name="search" color="orange" size={35} />
    ) : (
      <Icon name="search" color="white" size={35} />
    );
  } else if (route.name === "Lists") {
    icon = focused ? (
      <Icon name="list" color="orange" size={35} />
    ) : (
      <Icon name="list" color="white" size={35} />
    );
  } else if (route.name === "Notifications") {
    icon = focused ? (
      <Ionicons name="ios-heart-outline" size={32} color="orange" />
    ) : (
      <Ionicons name="ios-heart-outline" size={32} color="white" />
    );
  }

  return icon;
}

function BottomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon
            : renderIcon({ route: route, focused: isFocused });

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            {icon}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: hp("10%"),
  },
  tab: {
    flex: 33,
    alignItems: "center",
  },
});

export default BottomTabBar;
