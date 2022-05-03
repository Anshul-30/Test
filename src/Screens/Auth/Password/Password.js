import React, {useState} from 'react';
import {ScrollView, KeyboardAvoidingView, Platform, View} from 'react-native';
import {useSelector} from 'react-redux';
import ButtonComponent from '../../../Components/ButtonComponent';

import HeaderComponent from '../../../Components/HeaderComponent';
import TextComponent from '../../../Components/TextComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import {CHANGE_PASSWORD} from '../../../config/urls';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import {moderateScaleVertical} from '../../../styles/responsiveSize';
import {apiPost} from '../../../utils/utils';
import validations from '../../../utils/validations';
import styles from './styles';

export default function Password({navigation}) {
  const [isVisible, setIsVisible] = useState();
  const [isCVisible, setIsCVisible] = useState();
  const [state, setState] = useState({
    oldPass: '',
    newPass: '',
  });
  const {oldPass, newPass} = state;
  const updateArray = data => setState(state => ({...state, ...data}));
  const data = useSelector(state => state.userLogin?.userData);
  // console.log('data>>>>>>>>', data);
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
  );

  

  const passwordChange = () => {
    
        let apiData = {
          user_id: data.id,
          password: newPass,
          current_password: oldPass,
        };
        console.log(apiData);
        apiPost(CHANGE_PASSWORD, apiData)
          .then((res) => {
            
            console.log(res)
            navigation.goBack()
          })
          .catch((e) => {
            alert(e)
          });
     
    
  };
  return (
    <WrapperContainer>
      <HeaderComponent
        leftimage={true}
        text={true}
        headerTxt={'Change Password'}
        images={images.arrow}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.main}>
          <TextInputComp
            placeholder={strings.PASSWORD}
            righttxt={true}
            secureTextEntry={isVisible}
            value={oldPass}
            onChangeText={text => updateArray({oldPass: text})}
            onRightPress={() => setIsVisible(!isVisible)}
            text={isVisible ? 'Show' : 'Hide'}
          />
          <TextInputComp
            placeholder={strings.CONFIRM_PASSWORD}
            righttxt={true}
            value={newPass}
            onChangeText={text => updateArray({newPass: text})}
            secureTextEntry={isCVisible}
            onRightPress={() => setIsCVisible(!isCVisible)}
            text={isCVisible ? 'Show' : 'Hide'}
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View
          style={{
            paddingBottom:
              Platform.OS === 'ios'
                ? moderateScaleVertical(50)
                : moderateScaleVertical(20),
          }}>
          <ButtonComponent title="Password" onpress={passwordChange} />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
