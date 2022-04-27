import React from 'react'

import Login from '../Screens/Auth/Login/Login'
import LoginWithPhoneNumber from '../Screens/Auth/LoginWithPhoneNumber/LoginWithPhoneNumber'
import Signup from '../Screens/Auth/Signup/Signup'
import TutorialScreen from '../Screens/Auth/TutorialScreen/TutorialScreen'

import navigationStrings from './navigationStrings'

export default AuthStack =(Stack)=>{
    return(
        <>
        <Stack.Screen name={navigationStrings.SCREEN} component={TutorialScreen}/>
        <Stack.Screen name={navigationStrings.LOGIN} component={Login}/>
        <Stack.Screen name={navigationStrings.LoginWithPhone} component={LoginWithPhoneNumber}/>
        <Stack.Screen name={navigationStrings.Signup} component={Signup}/>
        
        </>
    )
}