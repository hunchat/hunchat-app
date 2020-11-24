import { createStackNavigator } from '@react-navigation/stack';

import AddVideoScreen from '../screens/AddVideoScreen';
import HomeScreen from '../screens/HomeScreen';


const Stack = createStackNavigator();

const FeedStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false,gestureEnabled: true}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddVideo" component={AddVideoScreen} />
  </Stack.Navigator>
)

export default FeedStack;
