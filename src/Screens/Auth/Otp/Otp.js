import React from 'react';
import {ScrollView, Platform, KeyboardAvoidingView, View} from 'react-native';
// import { KeyboardAvoidingView, ScrollView,p } from 'react-native-gesture-handler'
import ButtonComponent from '../../../Components/ButtonComponent';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextComponent from '../../../Components/TextComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import {moderateScaleVertical} from '../../../styles/responsiveSize';
import styles from './styles';

export default function Otp({navigation,route}) {
  const allData = route?.params?.data
console.log("data",allData)
console.log("your otp ", allData?.otp)
// alert("otp is",allData?.otp)
  return (
    <WrapperContainer>
      <HeaderComponent
        topimage={true}
        images={images.arrow}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <TextComponent text1={strings.HeaderOtp} styletxt={styles.text} />
        <TextComponent text1={strings.edit} styletxt={styles.text1} />
        <View style={styles.textinput}>
          <View style={{flex: 0.2}}>
            <TextInputComp />
          </View>
          <View style={{flex: 0.2}}>
            <TextInputComp />
          </View>
          <View style={{flex: 0.2}}>
            <TextInputComp />
          </View>
          <View style={{flex: 0.2}}>
            <TextInputComp />
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <TextComponent text1={strings.code} styletxt={styles.resend} />
        <View
          style={{
            paddingBottom:
              Platform.OS === 'ios'
                ? moderateScaleVertical(50)
                : moderateScaleVertical(20),
          }}>
          <ButtonComponent
            title={strings.Verify}
            onpress={() => navigation.navigate(navigationStrings.LoginWithPhone)}
          />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
