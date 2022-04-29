import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from './navigationStrings';

import {Home, Notification, Post, Profile, Search} from '../Screens/Main';
import images from '../constants/imagePath';
import { moderateScale, width } from '../styles/responsiveSize';

const Tab = createBottomTabNavigator();

export default BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            <Image source={images?.Home} style={{
                height: moderateScale(width / 10),
                width: moderateScale(width / 10),
                resizeMode: 'contain',
                marginTop: 5,
                tintColor: focused ? 'black' : 'grey',
              }} />;
          },
        }}
      />
      <Tab.Screen name={navigationStrings.Search} component={Search} />
      <Tab.Screen name={navigationStrings.Post} component={Post} />
      <Tab.Screen
        name={navigationStrings.Notification}
        component={Notification}
      />

      <Tab.Screen name={navigationStrings.Profile} component={Profile} />
    </Tab.Navigator>
  );
};
