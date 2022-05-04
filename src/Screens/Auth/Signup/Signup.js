import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import deviceInfo from 'react-native-device-info';
import ButtonComponent from '../../../Components/ButtonComponent';
import CountryCode from '../../../Components/CountryCode';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextComponent from '../../../Components/TextComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';
import colors from '../../../styles/colors';
import {
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import {showError} from '../../../utils/helperFunction';
import validator from '../../../utils/validations';

export default function Signup({navigation, route}) {
  

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [isVisible, setIsVisible] = useState();
  const [isCVisible, setIsCVisible] = useState();
  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');
  const {firstName, lastName, email, phoneNumber, password, confirmPassword} = state;
  const updateState = data => setState(state => ({...state, ...data}));

  const isValidData = () => {
    const error = validator({firstName, lastName, email, phoneNumber, password});
    if (error) {
      // alert(error)
      showError(error);
      return;
    }
    return true;
  };

  const signUp = () => {
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }
    let apiData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phoneNumber,
      phone_code: countryCode,
      country_code: countryFlag,
      device_token: deviceInfo.getUniqueId(),
      device_type: Platform.OS == 'ios' ? 'IOS' : 'ANDROID',
      password: password,
    };

    actions
      .signUp(apiData)

      .then(res => {
        console.log('singnup api res_+++++', res);
        
        navigation.navigate(navigationStrings.OTP, {
          data: res?.data,
        });
     
      })
      .catch(err => {
        console.log(err, 'err');
       
        showError(err?.message)
      });
  };

  return (
    <WrapperContainer>
      <View>
        <HeaderComponent
          images={images.arrow}
          leftimage={true}
          onPress={() => navigation.goBack()}
        />
      
        <TextComponent
          text1={strings.CREATE_A_NEW_ACCOUNT}
          styletxt={{fontSize: textScale(24), color: colors.white}}
        />
        <TextComponent text1={strings.HEADERTXT} />
      </View>
      <ScrollView bounces={false}>
        <View style={{marginTop: moderateScaleVertical(25)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{width: width / 2}}>
              <TextInputComp
                placeholder={strings.FIRSTNAME}
                onChangeText={text => updateState({firstName: text})}
                value={firstName}
              />
            </View>
            <View style={{width: width / 2}}>
              <TextInputComp
                placeholder={strings.LASTNAME}
                onChangeText={text => updateState({lastName: text})}
                value={lastName}
              />
            </View>
          </View>
          <TextInputComp
            placeholder={strings.EMAIL}
            onChangeText={text => updateState({email: text})}
            value={email}
          />
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                  onChangeText={text => updateState({phoneNumber: text})}
                  value={phoneNumber}
                  keyboardInputType="numeric"
                />
              </View>
            </View>
            <TextInputComp
              placeholder={strings.PASSWORD}
              righttxt={true}
              onChangeText={text => updateState({password: text})}
              value={password}
              secureTextEntry={isVisible}
              onRightPress={() => setIsVisible(!isVisible)}
              text={isVisible ? strings.SHOW : strings.HIDE}
            />
            <TextInputComp
              placeholder={strings.CONFIRM_PASSWORD}
              righttxt={true}
              secureTextEntry={isCVisible}
              onChangeText={text => updateState({confirmPassword: text})}
              value={confirmPassword}
              onRightPress={() => setIsCVisible(!isCVisible)}
              text={isCVisible ? strings.SHOW : strings.HIDE}
            />
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS == 'android' ? 'height' : 'padding'}>
        <View
          style={{
            paddingBottom:
              Platform.OS == 'ios'
                ? moderateScaleVertical(55)
                : moderateScaleVertical(20),
          }}>
          <ButtonComponent title={strings.NEXT} onpress={signUp} />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
