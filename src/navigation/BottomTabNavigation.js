import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import navigationStrings from './navigationStrings'
import Home from '../Screens/Home/Home'

const Tab = createBottomTabNavigator()

export default  BottomTab =()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen name={navigationStrings.HOME} component={Home} options={{headerShown:false}}/>
            
        </Tab.Navigator>
    )
}