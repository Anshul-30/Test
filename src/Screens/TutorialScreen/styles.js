import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
console.log(height)
export default styles = StyleSheet.create({
  container: {
//    flex:1,
    alignSelf: 'center',
    height: height - height/4,
    
    width: width - 60,
    marginTop: moderateScale(24),
    backgroundColor: '#4C4C4C',
    borderRadius: moderateScale(16),
    shadowColor: '#4C4C4C',
    shadowOffset: {height: -2, width: -2},
    shadowOpacity: 0.4,
    shadowRadius: 5,
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
  },
  textview: {
    marginHorizontal: moderateScale(24),
    // marginTop: moderateScaleVertical(8),
  },
  next:{
    color:colors.white,
    fontSize:textScale(15)
  }
});
