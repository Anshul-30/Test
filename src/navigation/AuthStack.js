import React from 'react'
import { Login, LoginWithPhoneNumber, Otp, Signup } from '../Screens/Auth'
import navigationStrings from './navigationStrings'




export default AuthStack =(Stack)=>{
    return(
        <>
        {/* <Stack.Screen name={navigationStrings.SCREEN} component={TutorialScreen}/> */}
        <Stack.Screen name={navigationStrings.LOGIN} component={Login}/>
        <Stack.Screen name={navigationStrings.LoginWithPhone} component={LoginWithPhoneNumber}/>
        <Stack.Screen name={navigationStrings.Signup} component={Signup}/>
        <Stack.Screen name={navigationStrings.OTP} component={Otp}/>
        {/* <Stack.Screen name={navigationStrings.Password} component={Password}/> */}
        </>
    )
}