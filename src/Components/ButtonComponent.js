import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import colors from '../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';
export default function ButtonComponent({
  title = '',
  onpress = '',
  stylbtn = '',
  textstyle = '',
  leftimage = false,
  rightimg=false,
  image = '',
}) {
  return (
    <TouchableOpacity onPress={onpress}>
      <View style={{...style.btnstyle, ...stylbtn}}>
       
          <View
            style={{flex: 0.15, alignItems: 'center', justifyContent: 'center'}}>
           {leftimage && (  <Image source={image} style={style.image} />   )}
          </View>
     
        <View style={{flex: 0.7,alignItems:"center"}}>
          <Text style={{...style.btntext, ...textstyle}}>{title}</Text>
        </View>
        <View
            style={{flex: 0.15, alignItems: 'center', justifyContent: 'center'}}>
           {rightimg && (  <Image source={image} style={style.image} />   )}
          </View>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  btnstyle: {
    marginHorizontal: moderateScale(24),
    backgroundColor: colors.button,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  btntext: {
    fontSize: textScale(14),
    paddingVertical: moderateScaleVertical(14),
    fontWeight: 'bold',
    color: colors.white,

 
  },
  image: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode:'contain'
  },
});

