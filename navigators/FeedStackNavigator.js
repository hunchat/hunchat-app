import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '../screens/FeedScreen';


const Stack = createStackNavigator();

const FeedStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false,gestureEnabled: true}}>
    <Stack.Screen name="Feed" component={FeedScreen} />
  </Stack.Navigator>
)

export default FeedStack;
