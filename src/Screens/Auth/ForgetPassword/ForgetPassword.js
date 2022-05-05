import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonComponent from '../../../Components/ButtonComponent';
import CountryCode from '../../../Components/CountryCode';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import {FORGOT_PASSWORD} from '../../../config/urls';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import {apiPost} from '../../../utils/utils';

export default function ForgetPassword({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');

  // -------------------Validartions--------------------

  const _onSubmitForgetPassword = () => {
    let apiData = {
      phone: phoneNumber,
      phone_code: countryCode,
    };
    console.log('apidata', apiData);
    apiPost(FORGOT_PASSWORD, apiData)
      .then(res => {
        console.log(res, 'res');
        // alert('res')
        navigation.navigate(navigationStrings.OTP, {data: res?.data});
      })
      .catch(err => {
        alert(err?.message);
      });
  };
  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <HeaderComponent
          leftimage={true}
          images={imagePath.arrow}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={{margin: moderateScale(15)}}>
            <Text style={styles.headerTxt}>{strings.FORGET_PASSWORD}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{flex: 0.4}}>
              <CountryCode
                countryCode={countryCode}
                countryFlag={countryFlag}
                setCountryCode={setCountryCode}
                setCountryFlag={setCountryFlag}
              />
            </View>
            <View style={{flex: 0.6}}>
              <TextInputComp
                placeholder={strings.MOBILE}
                // returnKeyType={'done'}
                // keyboardInputType={'phone-pad'}
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                value={phoneNumber}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View
          style={{
            paddingBottom:
              Platform.OS === 'ios'
                ? moderateScaleVertical(50)
                : moderateScaleVertical(24),
          }}>
          <ButtonComponent
            title={strings.FORGET_PASSWORD}
            onpress={_onSubmitForgetPassword}
          />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  headerTxt: {fontSize: textScale(24), color: colors.white},
});
