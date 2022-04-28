import React, {useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import CountryPicker, {Flag} from 'react-native-country-picker-modal';
import images from '../constants/imagePath';

import colors from '../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../styles/responsiveSize';
function CountryCode() {
  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');

  const onSelect = country => {
    setCountryFlag(country.cca2);
    setCountryCode(country.callingCode[0]);
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.bgColor,
          borderRadius: moderateScaleVertical(10),
          height: moderateScaleVertical(50),
          marginTop: moderateScaleVertical(10),
          // flex: 0.6,
          // width:moderateScale(width/4.4),
          marginLeft: moderateScale(15),
        }}>
        <CountryPicker
          onSelect={onSelect}
          visible={false}
          countryCode={countryFlag}
          withCallingCode={true}
          withCallingCodeButton={countryCode}
          theme={{onBackgroundTextColor: colors?.white}}
        />
        <Image
          source={images.down_arrow}
          style={{
            height: moderateScale(width / 24),
            width: moderateScale(width / 24),
            resizeMode: 'contain',
            marginLeft: moderateScaleVertical(5),
          }}
        />
      </View>
    </>
  );
}
const style = StyleSheet.create({});

export default CountryCode;
