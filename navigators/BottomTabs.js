import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import AddVideoScreen from '../screens/AddVideoScreen';


const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
            tabBarIcon: ({ color }) => (
                <Icon name="search" color={color} size={30} />
            )
        }}
        component={AddVideoScreen}
      />
      <Tab.Screen
        name="Lists"
        options={{
            tabBarLabel: '',
            tabBarButton: props => (
              <TouchableOpacity {...props} style={styles.listsTabBarButton} />
            ),
            tabBarIcon: ({ color }) => (
                <Icon name="list" color={color} size={30} />
            )
        }}
        component={AddVideoScreen}
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
