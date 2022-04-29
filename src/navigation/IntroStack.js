import React from 'react'
import TutorialScreen from '../Screens/Auth/TutorialScreen/TutorialScreen'
import navigationStrings from './navigationStrings'



export default IntroStack=(Stack)=>{
    return(<>
    <Stack.Screen name={navigationStrings.SCREEN} component={TutorialScreen}/>
    </>)
}