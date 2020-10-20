import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './sources/screens/Home.js'
import Splashscreen from './sources/screens/Splashscreen.js'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions = {{
            headerShown: false
          }}
        >
            <Stack.Screen name="Splashscreen" component={Splashscreen} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    </NavigationContainer>
  )
} 
