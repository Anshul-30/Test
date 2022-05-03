import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import WrapperContainer from '../../../Components/WrapperContainer';

import HeaderComponent from '../../../Components/HeaderComponent';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import TextInputComp from '../../../Components/TextInputComponent';
import ButtonComponent from '../../../Components/ButtonComponent';
import DeviceInfo from 'react-native-device-info'
import styles from './styles';
import actions from '../../../redux/actions';
import navigationStrings from '../../../navigation/navigationStrings';
import CountryCode from '../../../Components/CountryCode';
import TextComponent from '../../../Components/TextComponent';

export default function LoginWithPhoneNumber({navigation,route}) {
  const [state, setState] = useState({
    phone: '',
    pass: '',
  });
  const {phone, pass} = state;
  
  const updateArray = data => setState(state => ({...state, ...data}));
  const [isVisible, setIsVisble] = useState(false);
  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');
  console.log("device token", DeviceInfo.getUniqueId())
  const onLogin = () => {

        let apiData = {
          phone: phone,
          phone_code: countryCode,
          device_token: DeviceInfo.getUniqueId(),
          device_type: Platform.OS == 'ios' ? 'IOS' : 'ANDROID',
          loginType: 'admin',
          password: pass,
        };

        actions
          .login(apiData)
          .then(res => {
            console.log('singnup api res_+++++', res);
          })
          .catch(err => {
            console.log(err, 'err');
            alert(err?.message);
          });
      } 
  
  return (
    <WrapperContainer>
      <View>
        <HeaderComponent
          images={images.arrow}
          leftimage={true}
          // title={strings.Welcome_back}
          // title1={true}
          // text={true}
          onPress={() => navigation.goBack()}
          // text1={strings.Headertxt}
        />
      </View>
      <ScrollView>
        <View style={{height: height}}>
          <View>
            <TextComponent
              text1={strings.WELCOME_BACK}
              styletxt={styles.text1}
            />
            <TextComponent text1={strings.HEADERTXT} />
            <View style={{marginTop: moderateScale(35)}}>
              <View
                style={{
                  flexDirection: 'row',
                  // flex: 1,
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
                    onChangeText={text => updateArray({phone: text})}
                    value={phone}
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
                onChangeText={text => updateArray({pass: text})}
                value={pass}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(navigationStrings.OTP)}>
                  <Text style={styles.orText}>{strings.OTP}</Text>
                </TouchableOpacity>

                <Text style={styles.text}>{strings.FORGET}</Text>
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
