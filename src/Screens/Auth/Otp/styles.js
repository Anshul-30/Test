import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';

export default styles = StyleSheet.create({
  text: {
    fontSize: textScale(24),
    color: colors.white,
    marginHorizontal: moderateScale(15),
  },
  text1: {
    paddingTop: moderateScaleVertical(10),
    color: colors.blueC,
  },
  textinput: {
    flexDirection: 'row',
    // marginHorizontal:moderateScale(15),
    marginTop: moderateScaleVertical(30),
  },
  resend: {
    paddingBottom: moderateScaleVertical(15),
    marginHorizontal: moderateScale(15),
  },
  otpText: {
    color: colors.white,
    margin: moderateScale(15),
    fontSize: textScale(15),
  },
  otpView: {
    marginHorizontal: moderateScale(25),
    marginVertical: moderateScaleVertical(25),
  },
});
