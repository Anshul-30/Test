import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import { height, moderateScale, moderateScaleVertical, textScale, width } from '../../../styles/responsiveSize';

console.log(height)
export default styles = StyleSheet.create({
  container: {
  //  flex:.8,
    alignSelf: 'center',
    height: height - height/4,
    
    width: width - 60,
    marginTop: moderateScaleVertical(24),
    backgroundColor: '#4C4C4C',
    borderRadius: moderateScale(16),
    
  },
  image: {

    width: moderateScale(width/1.5),
    height: moderateScale(width/1.5),
    resizeMode:'contain',
    alignSelf: 'center',
    marginTop: moderateScaleVertical(100),
  },
  
  tittle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: textScale(22),
  },
  text: {
    color: '#999999',
    textAlign: 'center',
    // fontSize:textScale(13)
    // alignContent:'space-around'
  },
  textview: {
    marginHorizontal: moderateScale(24),
    paddingTop:moderateScale(12)
    // marginTop: moderateScaleVertical(8),
  },
  next:{
    color:colors.white,
    fontSize:textScale(15)
  }
});
