import React from 'react';
import {Text, TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import colors from '../styles/colors';
import fontfamily from '../styles/fontfamily';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';

export default function HeaderComponent({
  images,
  topimage = false,
  stylebtn = {},
  title,
  onPress={},
  text=false,
  title1 = false,
  text1
}) {
  return (
    <View >
      {topimage && (
        <View
          style={{
            marginLeft:moderateScale(15),
            marginTop: moderateScaleVertical(10),
          }}>
            <TouchableOpacity onPress={onPress}>

          <Image source={images} style={{...style.image, ...stylebtn}} />
            </TouchableOpacity>
        </View>
      )}
      {title1 && 
        <View>
          <Text style={{...style.text}}>{title}</Text>
        </View>
      }
      {

        text && <View style={{marginLeft:moderateScale(15)}}>
          <Text style={{...style.text1}} numberOfLines={1}>{text1}</Text>
          </View>
      }
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    height: moderateScale(height / 25),
    width: moderateScale(width / 25),
    resizeMode: 'contain',
  },
  text: {
    fontSize: textScale(20),
    color: colors.white,
    padding:moderateScale(15)
    // fontFamily:fontfamily.Medium
  },
  text1:{
color:colors.headertxt,
fontSize:textScale(14)
  }
});
