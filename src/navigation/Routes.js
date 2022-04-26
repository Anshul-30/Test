import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';



const Stack = createStackNavigator();

export default Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                {
                    false? MainStack(Stack) : AuthStack(Stack)
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
};
