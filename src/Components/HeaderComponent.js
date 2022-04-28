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
  onPress = {},
}) {
  return (
    <View>
      {topimage && (
        <View
          style={{
            marginLeft: moderateScale(15),
            marginTop: moderateScaleVertical(10),
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image source={images} style={{...style.image, ...stylebtn}} />
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
