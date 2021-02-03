import { createStackNavigator } from "@react-navigation/stack";

import ChatInboxScreen from "../screens/ChatInboxScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const HeaderStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="ChatInbox" component={ChatInboxScreen} />
  </Stack.Navigator>
);

export default HeaderStackNavigator;
