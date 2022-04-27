import React from 'react'
import Login from '../Screens/Auth/Login/Login'
import HomeStack from './HomeStack'
import navigationStrings from './navigationStrings'

export default MainStack =(Stack)=>{
    return(
        <>
        <Stack.Screen name={navigationStrings.HOME} component={HomeStack}/>
        </>
    )
}