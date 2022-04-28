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
  const [state, setState] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
    pass:'',
    cPass:''
   
  });
  const [isVisible, setIsVisible] = useState();
  const [isCVisible, setIsCVisible] = useState();

  const {fName, lName, email, phone,pass,cPass} = state;
  const updateArray = data => setState(state => ({...state, ...data}));
  const signUp = () => {
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
        navigation.navigate(navigationStrings.OTP, {data:res.data});
        console.log("apidata",res)
        console.log("dfata",data)
      })
      .catch(err => {
        console.log(err, 'err');
        alert(err?.message);
      });

    //     try{

    //      const data = await actions.signUp(apiData)
    //      console.log("hufh",data)

    //     }
    //     catch(e){
    // console.log(e)
    //     }
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.themeColor}}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            marginTop:
              Platform.OS == 'ios'
                ? moderateScaleVertical(44)
                : moderateScaleVertical(5),
          }}>
          <View>
            <HeaderComponent
              images={images.arrow}
              topimage={true}
              onPress={() => navigation.goBack()}
            />
            <TextComponent
              text1={strings.create_a_new_Account}
              styletxt={{fontSize: textScale(24), color: colors.white}}
            />
            <TextComponent text1={strings.Headertxt} />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{width: width / 2}}>
              <TextInputComp
                placeholder={strings.FirstName}
                onChangeText={text => updateArray({fName: text})}
                value={fName}
              />
            </View>
            <View style={{width: width / 2}}>
              <TextInputComp
                placeholder={strings.LastName}
                onChangeText={text => updateArray({lName: text})}
                value={lName}
              />
            </View>
          </View>
          <TextInputComp
            placeholder={strings.Email}
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
                <CountryCode />
              </View>
              <View style={{flex: 0.6}}>
                <TextInputComp
                  placeholder={strings.Mobile}
                  onChangeText={text => updateArray({phone: text})}
                  value={phone}
                />
              </View>
            </View>
            <TextInputComp
              placeholder={strings.Password}
              righttxt={true}
              onChangeText={text => updateArray({pass: text})}
                value={pass}
              secureTextEntry={isVisible}
              onRightPress={() => setIsVisible(!isVisible)}
              text={isVisible ? 'Show' : 'Hide'}
            />
            <TextInputComp
              placeholder={strings.Password}
              righttxt={true}
              secureTextEntry={isCVisible}
              onChangeText={text => updateArray({cPass: text})}
                value={cPass}
              onRightPress={() => setIsCVisible(!isCVisible)}
              text={isCVisible ? 'Show' : 'Hide'}
            />
          </View>

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
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
