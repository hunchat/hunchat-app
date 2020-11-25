import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import ExploreScreen from '../screens/ExploreScreen';
import ListsScreen from '../screens/ListsScreen';

import { BottomTabBar } from '../components/BottomTabBar';


const BottomTabNavigator = createBottomTabNavigator();


function BottomTabs() {
  return (
    <BottomTabNavigator.Navigator
      initialRouteName="Lists"
      tabBarOptions={ {showLabel: false} }
      tabBar={props => <BottomTabBar {...props} />}
    >
      <BottomTabNavigator.Screen
        name="Explore"
        component={ExploreScreen}
      />
      <BottomTabNavigator.Screen
        name="Lists"
        component={ListsScreen}
      />
    </BottomTabNavigator.Navigator>
  )
}


export default BottomTabs;
