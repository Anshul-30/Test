import React from 'react'
import Login from '../Screens/Auth/Login/Login'
import navigationStrings from './navigationStrings'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screens/Home/Home'
import BottomTab from './BottomTabNavigation'
const Stack = createStackNavigator()

export default HomeStack =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name={navigationStrings.HOME} component={BottomTab} options={{headerShown:false}}/>
        </Stack.Navigator>
        
    )
}