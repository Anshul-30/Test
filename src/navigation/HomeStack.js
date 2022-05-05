import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Password from '../Screens/Auth/Password/Password';
import { EditProfile } from '../Screens/Main';
import PostDetail from '../Screens/Main/PostDetail/PostDetail';
import BottomTab from './BottomTabNavigation';
import navigationStrings from './navigationStrings';


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
        component={EditProfile}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={navigationStrings.POST_DETAIL}
        component={PostDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
