import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import colors from '../styles/colors';
import { moderateScale, moderateScaleVertical, textScale } from '../styles/responsiveSize';


export default function TextComponent({
    text1,
    numberOfLines,
    styletxt,
    viewtext
}) {
  return (
    <View style={{marginLeft:moderateScale(15),marginTop:moderateScaleVertical(5),...viewtext}}>
          <Text style={{...style.text1,...styletxt}} numberOfLines={numberOfLines}>{text1}</Text>
          </View>
  )
}
const style = StyleSheet.create({
    
    text1:{
  color:colors.headertxt,
  fontSize:textScale(15)
    }
  });
  