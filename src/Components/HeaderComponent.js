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
  leftimage = false,
  stylebtn = {},
  onPress = {},
  rightimage = false,
  rigthImage,
  stylebtnl,
  text = false,
  headerTxt,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginLeft: moderateScale(15),
        marginTop: moderateScaleVertical(10),
        alignItems:'center'
      }}>
      {leftimage && (
        <View
          style={{
            flex: 0.1,
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image source={images} style={{...style.image, ...stylebtn}} />
          </TouchableOpacity>
        </View>
      )}
      {text && (
        <View style={{flex: 0.7}}>
          <Text style={{color:colors.white,fontSize:textScale(14)}}>{headerTxt}</Text>
        </View>
      )}
      {rightimage && (
        <View
          style={{
            flex: 0.2,
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image source={rigthImage} style={{...style.image, ...stylebtnl}} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    height: moderateScale(height / 25),
    width: moderateScale(width / 25),
    resizeMode: 'contain',
  },
});
