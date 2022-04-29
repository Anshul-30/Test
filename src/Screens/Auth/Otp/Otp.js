import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ButtonComponent from '../../../Components/ButtonComponent';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextComponent from '../../../Components/TextComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import styles from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import actions from '../../../redux/actions';
import colors from '../../../styles/colors';

export default function Otp({navigation, route}) {
  const allData = route?.params?.data;
  console.log('data', allData);
  console.log('your otp ', allData?.otp);
  const [code, setCode] = useState();
  // alert("otp is",allData?.otp)
const otp = allData?.otp
  const otpValidation =()=>{
    if(otp == code){
      actions.saveUserData(allData)
    }
    else{
      alert("Wrong Otp")
    }
  }
  return (
    <WrapperContainer>
      <HeaderComponent
        topimage={true}
        images={images.arrow}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Text style={styles.text}>
          {strings.HeaderOtp}+{allData?.phone_code} {allData?.phone}
        </Text>
        {/* <TextComponent text1={strings.HeaderOtp} styletxt={styles.text} /> */}
        <TextComponent text1={strings.edit} styletxt={styles.text1} />
        <Text style={{color:colors.white,margin:moderateScale(15),fontSize:textScale(15)}}>Your otp is :{otp}</Text>

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
              marginLeft:moderateScale(15),
              backgroundColor:colors.bgColor
            }}
          />
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
            onpress={otpValidation
              // navigation.navigate(navigationStrings.LoginWithPhone)
            }
          />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
