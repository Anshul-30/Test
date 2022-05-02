import React from 'react'
import { Login, LoginWithPhoneNumber, Otp, Signup } from '../Screens/Auth'
import navigationStrings from './navigationStrings'




export default AuthStack =(Stack)=>{
    return(
        <>
        {/* <Stack.Screen name={navigationStrings.SCREEN} component={TutorialScreen}/> */}
        <Stack.Screen name={navigationStrings.LOGIN} component={Login}/>
        <Stack.Screen name={navigationStrings.LOGIN_WITH_PHONE} component={LoginWithPhoneNumber}/>
        <Stack.Screen name={navigationStrings.SIGNUP} component={Signup}/>
        <Stack.Screen name={navigationStrings.OTP} component={Otp}/>
        
        </>
    )
}