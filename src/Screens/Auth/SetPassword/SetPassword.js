import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import ButtonComponent from '../../../Components/ButtonComponent';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import { CHANGE_PASSWORD } from '../../../config/urls';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from "../../../styles/colors";
import { moderateScaleVertical, textScale } from "../../../styles/responsiveSize";
import { showError } from '../../../utils/helperFunction';
import { apiPost } from '../../../utils/utils';
import validator from '../../../utils/validations';


export default function SetPassword({navigation, route}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCVisible, setIsCVisible] = useState(true);

  
  const [state, setState] = useState({
    confirmPassword: '',
    password: '',
  });


  const {confirmPassword, password} = state;
  const updateState = data => setState(state => ({...state, ...data}));
  const data = useSelector(state => state.userLogin?.userData);
  // console.log('data>>>>>>>>', data);
const number = route?.params?.numer
console.log('number',number)
  const isValidData = () => {
    const error = validator({ password,confirmPassword});
    if (error) {
      showError(error);
      return;
    }
    return true;
  };

  const _onChangePassword = () => {
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }
    let apiData = {
      user_id: number.user_id,
      password: password,
      // current_password: password,
    };
    console.log(apiData);
    apiPost(CHANGE_PASSWORD, apiData)
      .then(res => {
        console.log(res);
        // navigation.goBack();
        navigation.navigate(navigationStrings.LOGIN_WITH_PHONE)
      })
      .catch(e => {
        // alert(e);
      });
  };
  return (
    <WrapperContainer>
      <HeaderComponent
        leftimage={true}
        text={true}
        headerTxt={strings.CHANGE_PASSWORD}
        images={images.arrow}
        onPress={() => navigation.goBack()}
      />
      <ScrollView bounces={false}>
        <View style={styles.main}>
          <TextInputComp
            placeholder={strings.NEW_PASSWORD}
            righttxt={true}
            secureTextEntry={isVisible}
            value={password}
            onChangeText={text => updateState({password: text})}
            onRightPress={() => setIsVisible(!isVisible)}
            text={isVisible ? strings.SHOW : strings.HIDE}
          />
          <TextInputComp
            placeholder={strings.CONFIRM_PASSWORD}
            righttxt={true}
            value={confirmPassword}
            onChangeText={text => updateState({confirmPassword: text})}
            secureTextEntry={isCVisible}
            onRightPress={() => setIsCVisible(!isCVisible)}
            text={isCVisible ? strings.SHOW : strings.HIDE}
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View style={{
          paddingBottom:Platform.OS==='ios'? moderateScaleVertical(50):moderateScaleVertical(25)
        }}>
          <ButtonComponent
            title={strings.CHANGE_PASSWORD}
            onpress={_onChangePassword}
          />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
    text:{
        fontSize: textScale(24),
        color: colors.white,
    },
    text1:{
        paddingTop:moderateScaleVertical(10),
        
    },
    main:{
        marginTop:moderateScaleVertical(25)
    }
})