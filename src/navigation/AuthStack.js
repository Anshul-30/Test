import React from 'react'
import Login from '../Screens/Login/Login'
import TutorialScreen from '../Screens/TutorialScreen/TutorialScreen'
import navigationStrings from './navigationStrings'

export default AuthStack =(Stack)=>{
    return(
        <>
        <Stack.Screen name={navigationStrings.SCREEN} component={TutorialScreen}/>

        <Stack.Screen name={navigationStrings.LOGIN} component={Login}/>
        </>
    )
}