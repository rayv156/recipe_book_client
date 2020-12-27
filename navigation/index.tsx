import { NavigationContainer, DefaultTheme, DarkTheme, getStateFromPath } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import Login from './Login'
import Signup from './Signup'
import NotFoundScreen from '../screens/NotFoundScreen';
import Show from '../screens/Show';
import FaveShow from '../screens/FaveShow'
import GroceryShow from '../screens/GroceryShow'
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { GlobalCtx } from '../App';
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
  const {gState, setgState} = React.useContext(GlobalCtx)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={gState.token ? BottomTabNavigator : Login}/> 
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Show" component={Show} options={{ title: 'Recipe' }} />
      <Stack.Screen name="FaveShow" component={FaveShow} options={{ title: 'FaveShow' }} />
      <Stack.Screen name="GroceryShow" component={GroceryShow} options={{ title: 'GroceryShow' }} />
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
    </Stack.Navigator>
  );
}
