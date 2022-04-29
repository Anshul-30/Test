import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from './navigationStrings';

import {Home, Notification, Post, Profile, Search} from '../Screens/Main';
import images from '../constants/imagePath';
import { moderateScale, moderateScaleVertical, width } from '../styles/responsiveSize';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

export default BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false ,tabBarStyle:{backgroundColor:colors.bgColor,borderTopWidth:moderateScaleVertical(0)}}}>
      <Tab.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={images.Home}
              style={{
                height: moderateScale(width / 20),
                width: moderateScale(width / 20),
                resizeMode: 'contain',
                marginTop:moderateScale(10),
                tintColor: focused ? 'red' : 'white',
              }}
            />
          ),
          // tabBarItemStyle: {height: 40},
        }}
      />
      <Tab.Screen name={navigationStrings.Search} component={Search} 
       options={{
        tabBarIcon: ({focused}) => (
          <Image
            source={images.search}
            style={{
              height: moderateScale(width / 20),
              width: moderateScale(width / 20),
              resizeMode: 'contain',
              marginTop:moderateScale(10),
              tintColor: focused ? 'red' : 'white',
            }}
          />
        ),
        // tabBarItemStyle: {height: 40},
      }}/>
      <Tab.Screen name={navigationStrings.Post} component={Post}
       options={{
        tabBarIcon: ({focused}) => (
          <Image
            source={images.post}
            style={{
              height: moderateScale(width / 20),
              width: moderateScale(width / 20),
              resizeMode: 'contain',
              marginTop:moderateScale(10),
              tintColor: focused ? 'red' : 'white',
            }}
          />
        ),
        // tabBarItemStyle: {height: 40},
      }} />
      <Tab.Screen
        name={navigationStrings.Notification}
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={images?.Notify}
              style={{
                height: moderateScale(width / 20),
                width: moderateScale(width / 20),
                resizeMode: 'contain',
                marginTop:moderateScale(10),
                tintColor: focused ? 'red' : 'white',
              }}
            />
          ),
          // tabBarItemStyle: {height: 40},
        }}
      />

      <Tab.Screen name={navigationStrings.Profile} component={Profile} 
       options={{
        tabBarIcon: ({focused}) => (
          <Image
            source={images.profile}
            style={{
              height: moderateScale(width / 20),
              width: moderateScale(width / 20),
              resizeMode: 'contain',
              marginTop:moderateScale(10),
              tintColor: focused ? 'red' : 'white',
            }}
          />
        ),
        // tabBarItemStyle: {height: 40},
      }}/>
    </Tab.Navigator>
  );
};
