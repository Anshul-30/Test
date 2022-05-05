import React from 'react'
import { ForgetPassword, Login, LoginWithPhoneNumber, Otp, Signup } from '../Screens/Auth'
import SetPassword from '../Screens/Auth/SetPassword/SetPassword'

import navigationStrings from './navigationStrings'




export default AuthStack =(Stack)=>{
    return(
        <>
        {/* <Stack.Screen name={navigationStrings.SCREEN} component={TutorialScreen}/> */}
        <Stack.Screen name={navigationStrings.LOGIN} component={Login}/>
        <Stack.Screen name={navigationStrings.LOGIN_WITH_PHONE} component={LoginWithPhoneNumber}/>
        <Stack.Screen name={navigationStrings.SIGNUP} component={Signup}/>
        <Stack.Screen name={navigationStrings.OTP} component={Otp}/>
        <Stack.Screen name={navigationStrings.FORGET_PASSWORD} component={ForgetPassword}/>
        <Stack.Screen name={navigationStrings.SET_PASSWORD} component={SetPassword}/>

        
        </>
    )
}