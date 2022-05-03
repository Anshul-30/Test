import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
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
  const phoneRegex = /^[0-9]{10}$/;
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  );
  const nameRegex = /^[a-zA-Z]{3,12}$/;
  const emailRegex = /^[\w-\.\_\$]+@([\w]{3,5}\.)[\w]{2,4}$/;

  const [state, setState] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
    pass: '',
    cPass: '',
  });
  const [isVisible, setIsVisible] = useState();
  const [isCVisible, setIsCVisible] = useState();
  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');
  const {fName, lName, email, phone, pass, cPass} = state;
  const updateArray = data => setState(state => ({...state, ...data}));

  const isValidData = () => {
    const error = validator({fName, lName, email, phone, pass});
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
      first_name: fName,
      last_name: lName,
      email: email,
      phone: phone,
      phone_code: countryCode,
      country_code: countryFlag,
      device_token: 'KDKFJDKFDFKDFDF',
      device_type: Platform.OS == 'ios' ? 'IOS' : 'ANDROID',
      password: pass,
    };

    actions
      .signUp(apiData)

      .then(res => {
        console.log('singnup api res_+++++', res);
        alert('User signup successfully....!!!');
        navigation.navigate(navigationStrings.OTP, {
          data: res?.data,
        });
        // console.log('apidata', res);
        // console.log('dfata', data);
      })
      .catch(err => {
        console.log(err, 'err');
        alert(err?.message);
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
        <ScrollView></ScrollView>
        <TextComponent
          text1={strings.create_a_new_Account}
          styletxt={{fontSize: textScale(24), color: colors.white}}
        />
        <TextComponent text1={strings.Headertxt} />
      </View>
      <ScrollView>
        <View style={{marginTop: moderateScaleVertical(25)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{width: width / 2}}>
              <TextInputComp
                placeholder={strings.FIRSTNAME}
                onChangeText={text => updateArray({fName: text})}
                value={fName}
              />
            </View>
            <View style={{width: width / 2}}>
              <TextInputComp
                placeholder={strings.LASTNAME}
                onChangeText={text => updateArray({lName: text})}
                value={lName}
              />
            </View>
          </View>
          <TextInputComp
            placeholder={strings.EMAIL}
            onChangeText={text => updateArray({email: text})}
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
                  onChangeText={text => updateArray({phone: text})}
                  value={phone}
                  keyboardInputType="numeric"
                />
              </View>
            </View>
            <TextInputComp
              placeholder={strings.PASSWORD}
              righttxt={true}
              onChangeText={text => updateArray({pass: text})}
              value={pass}
              secureTextEntry={isVisible}
              onRightPress={() => setIsVisible(!isVisible)}
              text={isVisible ? 'Show' : 'Hide'}
            />
            <TextInputComp
              placeholder={strings.CONFIRM_PASSWORD}
              righttxt={true}
              secureTextEntry={isCVisible}
              onChangeText={text => updateArray({cPass: text})}
              value={cPass}
              onRightPress={() => setIsCVisible(!isCVisible)}
              text={isCVisible ? 'Show' : 'Hide'}
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
          <ButtonComponent title={strings.Next} onpress={signUp} />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
