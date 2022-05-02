import React from 'react';
import Login from '../Screens/Auth/Login/Login';
import navigationStrings from './navigationStrings';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Main/Home/Home';
import BottomTab from './BottomTabNavigation';
import Password from '../Screens/Auth/Password/Password';
import Edit_Profile from '../Screens/Main/Edit_Profile/Edit_Profile';

const Stack = createStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationStrings.HOME}
        component={BottomTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.CHANGE_PASSWORD}
        component={Password}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.EDIT_PROFILE}
        component={Edit_Profile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
