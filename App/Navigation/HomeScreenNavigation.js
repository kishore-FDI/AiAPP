import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Pages/HomeScreen';
import ChatScreen from '../Pages/ChatScreen';


const Stack=createNativeStackNavigator();
export default function HomeNavigation() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="chat" component={ChatScreen} />
      </Stack.Navigator>
    )
  }