import React, {useState} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

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
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';

export default function Signup({navigation}) {
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

  const {fName, lName, email, phone, pass, cPass} = state;
  const updateArray = data => setState(state => ({...state, ...data}));
  const signUp = () => {
    if (nameRegex.test(fName)) {
      if (nameRegex.test(lName)) {
        if (emailRegex.test(email)) {
          if (phoneRegex.test(phone)) {
            if (strongRegex.test(pass)) {
              if (pass === cPass) {
                let apiData = {
                  first_name: fName,
                  last_name: lName,
                  email: email,
                  phone: phone,
                  phone_code: '91',
                  country_code: 'IN',
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
                      data: res.data,
                    });
                    console.log('apidata', res);
                    console.log('dfata', data);
                  })
                  .catch(err => {
                    console.log(err, 'err');
                    alert(err?.message);
                  });
              } else {
                alert('password must match');
              }
            } else {
              alert('Enter Strong Password');
            }
          } else {
            alert('Enter Valid Number');
          }
        } else {
          alert('Enter valid Email');
        }
      } else {
        alert('Enter last name');
      }
    } else {
      alert('Enter First Name');
    }
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.4}}>
              <CountryCode />
            </View>
            <View style={{flex: 0.6}}>
              <TextInputComp
                placeholder={strings.MOBILE}
                onChangeText={text => updateArray({phone: text})}
                value={phone}
                keyboardInputType='numeric'
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
