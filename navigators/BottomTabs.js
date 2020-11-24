import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import AddVideoScreen from '../screens/AddVideoScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ListsScreen from '../screens/ListsScreen';


const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Lists"
      tabBarOptions={ {showLabel: false} }
    >
      <Tab.Screen
        name="AddVideo"
        options={{
            tabBarLabel: '',
            tabBarButton: props => (
              <TouchableOpacity {...props} style={styles.addVideoTabBarButton} />
            ),
            tabBarIcon: () => (
                <Icon name="videocam" color="white" size={53} />
            )
        }}
        component={AddVideoScreen}
      />
      <Tab.Screen
        name="Explore"
        options={{
            tabBarLabel: '',
            tabBarButton: props => (
              <TouchableOpacity {...props} style={styles.exploreTabBarButton} />
            ),
            tabBarIcon: ({ focused }) => (
                focused ? <Icon name="search" color="black" size={35} />
                  : <Icon name="search" color="grey" size={35} />
            )
        }}
        component={ExploreScreen}
      />
      <Tab.Screen
        name="Lists"
        options={{
            tabBarLabel: '',
            tabBarButton: props => (
              <TouchableOpacity {...props} style={styles.listsTabBarButton} />
            ),
            tabBarIcon: ({ focused }) => (
                focused ? <Icon name="list" color="black" size={35} />
                  : <Icon name="list" color="grey" size={35} />
            )
        }}
        component={ListsScreen}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  addVideoTabBarButton: {
    flex: 46,
    backgroundColor: 'black',
  },
  exploreTabBarButton: {
    flex: 27,
  },
  listsTabBarButton: {
    flex: 27,
  }
})

export default BottomTabs;
