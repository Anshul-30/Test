import React from 'react'
import Login from '../Screens/Auth/Login/Login'
import navigationStrings from './navigationStrings'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screens/Home/Home'
const Stack = createStackNavigator()

export default HomeStack =()=>{
    return(
        <Stack.Navigator>

            <Stack.Screen name={navigationStrings.HOME} component={Home}/>
        </Stack.Navigator>
        
    )
}