import Reacr from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'white',
    marginVertical: moderateScaleVertical(10),
  },
  text: {
    color: colors.black,
  },
  text1: {
    textAlign: 'center',
    color: colors.text,
    fontSize: textScale(13),
    padding: moderateScale(7),
  },
  images: {
    justifyContent: 'center',
    resizeMode: 'contain',
    height: moderateScale(height - height / 1.5),
    width: moderateScale(width - width / 1.5),
  },
  // login:{
  //     paddingTop:moderateScaleVertical(0)
  // },
  orText: {
    color: colors.white,
    textAlign: 'center',
    padding: moderateScale(7),
    fontSize: textScale(15),
  },
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#41CCFF',
    fontSize: textScale(14),
  },
  newHereText: {
    color: colors.white,
    fontSize: textScale(14),
  },
  signUpView: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: moderateScale(10),
  },
  privacyView:{
    marginTop: moderateScaleVertical(20),
    marginHorizontal: moderateScale(10),
    // paddingTop: moderateScale(5),
  }
});

export default styles;
