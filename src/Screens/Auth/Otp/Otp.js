import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import ButtonComponent from '../../../Components/ButtonComponent';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextComponent from '../../../Components/TextComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import actions from '../../../redux/actions';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical
} from '../../../styles/responsiveSize';
import { showError } from '../../../utils/helperFunction';
import styles from './styles';

export default function Otp({navigation, route}) {
  const allData = route?.params?.data;
  console.log('data', allData);
  // console.log('your otp ', allData?.otp);
  const [code, setCode] = useState();
  // alert("otp is",allData?.otp)
  const otp = allData?.otp;
  const otpValidation = () => {
    if (otp == code) {
      actions.saveUserData(allData);
    } else {
      showError('Wrong Otp');
    }
  };
  return (
    <WrapperContainer>
      <HeaderComponent
        leftimage={true}
        images={images.arrow}
        onPress={() => navigation.goBack()}
      />
      <ScrollView bounces={false}>
        <Text style={styles.text}>
          {strings.HEADER_OTP}+{allData?.phone_code} {allData?.phone}
        </Text>
        {/* <TextComponent text1={strings.HeaderOtp} styletxt={styles.text} /> */}
        <TextComponent text1={strings.EDIT} styletxt={styles.text1} />
        <Text style={styles.otpText}>Your otp is :{otp}</Text>

        <View
          style={{
            marginHorizontal: moderateScale(25),
            marginVertical: moderateScaleVertical(25),
          }}>
          <SmoothPinCodeInput
            value={code}
            onTextChange={code => setCode(code)}
            cellStyle={{
              // borderWidth: moderateScaleVertical(1),
              borderRadius: moderateScale(5),
              marginLeft: moderateScale(15),
              backgroundColor: colors.bgColor,
            }}
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TextComponent text1={strings.CODE} styletxt={styles.resend} />
          <CountDown
            timeToShow={'S'}
            digitStyle={{backgroundColor: colors?.them}}
            until={45}
            timeLabels={'S'}
            digitTxtStyle={{color: colors.white, fontSize: 13}}
          />
        </View>
        <View
          style={{
            paddingBottom:
              Platform.OS === 'ios'
                ? moderateScaleVertical(50)
                : moderateScaleVertical(20),
          }}>
          <ButtonComponent title={strings.VERIFY} onpress={otpValidation} />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
