import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import GroceryList from '../screens/GroceryList'
import Timer from '../screens/Timer'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="star-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Grocery List"
        component={GroceryListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Timer"
        component={TimerNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="timer-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: 'Recipes' }}
      />
    </HomeStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator<FavoritesParamList>();

function FavoritesNavigator() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="FavoritesScreen"
        component={Favorites}
        options={{ headerTitle: 'Favorites' }}
      />
    </FavoritesStack.Navigator>
  );
}

const GroceryListStack = createStackNavigator<GroceryListParamList>();

function GroceryListNavigator() {
  return (
    <GroceryListStack.Navigator>
      <GroceryListStack.Screen
        name="GroceryListScreen"
        component={GroceryList}
        options={{ headerTitle: 'Grocery List' }}
      />
    </GroceryListStack.Navigator>
  );
}

const TimerStack = createStackNavigator<TimerParamList>();

function TimerNavigator() {
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen
        name="TimerScreen"
        component={Timer}
        options={{ headerTitle: 'Timer' }}
      />
    </TimerStack.Navigator>
  );
}
