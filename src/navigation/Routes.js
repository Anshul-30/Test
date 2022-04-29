import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';
import userLogin from '../redux/reducers/loginReducer';
import IntroStack from './IntroStack';



const Stack = createStackNavigator();

export default Routes = () => {
const data = useSelector(state => state.userLogin?.userData)
const intro = useSelector(state => state.intro)
console.log('intr',intro)
console.log("store",data)
console.log("access token",data?.access_token)
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                {
                        intro ? IntroStack(Stack):!!data?.access_token ?MainStack(Stack):AuthStack(Stack)
                //    !!data?.access_token? MainStack(Stack) : AuthStack(Stack)
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
};
