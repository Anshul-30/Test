import React from 'react';
import {View, Platform, StyleSheet, Text, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../styles/colors';
// import fontFamily from "../styles/fontFamily";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/responsiveSize';

const TextInputComp = ({
  value,
  onChangeText,
  placeholder,
  inputStyle,
  textStyle,
  headerText,
  headerTextStyle,
  keyboardInputType,
  header = false,
  righttxt = false,
  text,
  secureTextEntry=false,
  onRightPress,
  ...props
}) => {
  return (
    <>
      {header && (
        <Text style={{...styles.headerTextStyle, ...headerTextStyle}}>
          {headerText}
        </Text>
      )}
      <View style={{...styles.main}}>
        <View
          style={{
            flex: .95,
            alignContent: 'space-between',
          }}>
          <TextInput
            style={{...styles.textStyle, ...textStyle}}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={colors.whiteOpacity50}
            // returnKeyType="done"
            {...props}
            keyboardType={keyboardInputType}
          />
        </View>
        {righttxt && (
          <TouchableOpacity onPress={onRightPress}>
            {/* <View style={{flex: 0.01}}> */}
              <Text
                style={{
                  color: colors.whiteOpacity50,
                  paddingTop: moderateScaleVertical(15),
                  paddingLeft: moderateScale(25),
                }}>
                {text}
              </Text>
            {/* </View>s */}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    // paddingHorizontal: moderateScale(16),
    // marginBottom: moderateScaleVertical(16),
    fontSize: textScale(14),
    // fontFamily: fontFamily.regular,
    // color: '#000000'
    // borderColor:colors.blackOpacity20,
    // opacity: 0.12,
    // borderWidth:0.5,
    paddingTop: moderateScaleVertical(15),
    paddingHorizontal: moderateScale(10),
    // backgroundColor:colors.themeGrayOpacity10
  },
  headerTextStyle: {
    // fontFamily: fontFamily.medium,
    color: colors.gray4,
    fontSize: textScale(12),
    // lineHeight: moderateScale(16),
    // marginBottom: moderateScaleVertical(3),
  },
  main: {
    flexDirection: 'row',
    backgroundColor: colors.bgColor,
    borderRadius: moderateScale(8),
    minHeight: moderateScale(48),
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(10),
  },
});

export default TextInputComp;
