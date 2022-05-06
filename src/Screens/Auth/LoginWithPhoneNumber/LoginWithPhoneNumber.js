import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
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
import {
  height,
  moderateScale,
  moderateScaleVertical
} from '../../../styles/responsiveSize';
import { showError } from '../../../utils/helperFunction';
import validator from '../../../utils/validations';
import styles from './styles';

export default function LoginWithPhoneNumber({navigation, route}) {
  const [state, setState] = useState({
    phoneNumber: '',
    password: '',
  });
  const {phoneNumber, password} = state;

  const updateState = data => setState(state => ({...state, ...data}));
  const [isVisible, setIsVisble] = useState(true);
  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');
  console.log('device token', DeviceInfo.getUniqueId());

  const isValidData = () => {
    const error = validator({phoneNumber, password});
    if (error) {
      // alert(error)
      showError(error);
      return;
    }
    return true;
  };

  const onLogin = () => {
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }
    let apiData = {
      phone: phoneNumber,
      phone_code: countryCode,
      device_token: DeviceInfo.getUniqueId(),
      device_type: Platform.OS == 'ios' ? 'IOS' : 'ANDROID',
      loginType: 'admin',
      password: password,
    };

    actions
      .login(apiData)
      .then(res => {
        console.log('login api res_+++++', res);
      })
      .catch(err => {
        console.log(err, 'err');
        // showError(err?.meassage)
        alert(err?.message);
      });
  };

const _forgetPassword=()=>{
  navigation.navigate(navigationStrings.FORGET_PASSWORD)
}

  return (
    <WrapperContainer>
      <View>
        <HeaderComponent
          images={images.arrow}
          leftimage={true}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView bounces={false}>
        <View style={{height: height}}>
          <View>
            <TextComponent
              text1={strings.WELCOME_BACK}
              styletxt={styles.text1}
            />
            <TextComponent text1={strings.HEADERTXT} />
            <View style={{marginTop: moderateScale(35)}}>
              <View
                style={styles.countryCodeView}>
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
                    retunKey={'next'}
                    autoFocus={true}
                    
                  />
                </View>
              </View>
            </View>
            <View>
              <TextInputComp
                placeholder={strings.PASSWORD}
                righttxt={true}
                secureTextEntry={isVisible}
                onRightPress={() => setIsVisble(!isVisible)}
                text={isVisible ? strings.SHOW : strings.HIDE}
                onChangeText={text => updateState({password: text})}
                value={password}
                retunKey={'done'}
                
              />
              <View
                style={styles.otpText}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(navigationStrings.OTP)}>
                  <Text style={styles.orText}>{strings.OTP}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={_forgetPassword}>
                  <Text style={styles.text}>{strings.FORGET}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View
          style={{
            paddingBottom:
              Platform.OS === 'ios'
                ? moderateScaleVertical(55)
                : moderateScaleVertical(20),
          }}>
          <ButtonComponent title={strings.LOGIN_WITH_PHONE} onpress={onLogin} />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
