import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import ButtonComponent from '../../../Components/ButtonComponent';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import { CHANGE_PASSWORD } from '../../../config/urls';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import actions from '../../../redux/actions';
import { showError } from '../../../utils/helperFunction';
import { apiPost } from '../../../utils/utils';
import validator from '../../../utils/validations';
import styles from './styles';

export default function Password({navigation, route}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCVisible, setIsCVisible] = useState(true);
  const [state, setState] = useState({
    password: '',
    newPassword: '',
  });
  const {password, newPassword} = state;
  const updateState = data => setState(state => ({...state, ...data}));
  const data = useSelector(state => state.userLogin?.userData);
  // console.log('data>>>>>>>>', data);

  const isValidData = () => {
    const error = validator({password, newPassword});
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
      user_id: data.id,
      password: newPassword,
      current_password: password,
    };
    console.log(apiData);
    actions.changePassword(apiData)
      .then(res => {
        console.log(res);
        navigation.goBack();
      })
      .catch(e => {
        alert(e);
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
            placeholder={strings.PASSWORD}
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
            value={newPassword}
            onChangeText={text => updateState({newPassword: text})}
            secureTextEntry={isCVisible}
            onRightPress={() => setIsCVisible(!isCVisible)}
            text={isCVisible ? strings.SHOW : strings.HIDE}
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View>
          <ButtonComponent
            title={strings.CHANGE_PASSWORD}
            onpress={_onChangePassword}
          />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
