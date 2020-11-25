import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';



function renderIcon({ route, focused }) {
  let icon;

  if (route.name === 'Explore') {
    icon = focused
      ? <Icon name="search" color="black" size={35} />
      : <Icon name="search" color="grey" size={35} />
  } else if (route.name === 'Lists') {
    icon = focused
      ? <Icon name="list" color="black" size={35} />
      : <Icon name="list" color="grey" size={35} />
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
      <TouchableOpacity
        onPress={() => navigation.navigate("AddVideoStack", { screen: "Camera" })}
        style={styles.addVideoTabBarButton}
      >
        <Icon name="videocam" color="white" size={53} />
      </TouchableOpacity>
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
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    height: hp('10%'),
  },
  addVideoTabBarButton: {
    flex: 46,
    backgroundColor: 'black',
    height: '100%',
  },
  tab: {
    flex: 28,
    alignItems: 'center',
  },
})


export default BottomTabBar;
