import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Flights from '../screens/Flights'
import Origin from '../screens/bookingScreens/Origin'
import Destiny from '../screens/bookingScreens/Destiny'
import Dates from '../screens/bookingScreens/Dates'
import Passengers from '../screens/bookingScreens/Passengers'
import Confirm from '../screens/bookingScreens/Confirm'

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Flights}/>
      <Stack.Screen name="Origin" component={Origin}/>
      <Stack.Screen name="Destiny" component={Destiny}/>
      <Stack.Screen name="Dates" component={Dates}/>
      <Stack.Screen name="Passengers" component={Passengers}/>
      <Stack.Screen name="Confirm" component={Confirm}/>
    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})