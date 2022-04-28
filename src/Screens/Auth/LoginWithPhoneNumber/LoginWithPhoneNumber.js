import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
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

import styles from './styles';
import actions from '../../../redux/actions';
import navigationStrings from '../../../navigation/navigationStrings';
import CountryCode from '../../../Components/CountryCode';
import TextComponent from '../../../Components/TextComponent';

export default function LoginWithPhoneNumber({navigation}) {
  const [state, setState] = useState({
    phone: '',
    pass: '',
  });
  const {phone, pass} = state;
  const updateArray = data => setState(state => ({...state, ...data}));

  const onLogin = () => {
    actions.Login(state);
  };
  return (
    <WrapperContainer>
      
        <View>
          <HeaderComponent
            images={images.arrow}
            topimage={true}
            // title={strings.Welcome_back}
            // title1={true}
            // text={true}
            onPress={() => navigation.goBack()}
            // text1={strings.Headertxt}
          />
        </View>
        <ScrollView>
          <View style={{height:height}}>
            
          

          <View>
            <TextComponent
              text1={strings.Welcome_back}
              styletxt={styles.text1}
            />
            <TextComponent text1={strings.Headertxt} />
            <View
              style={{
                flexDirection: 'row',
                // flex: 1,
                justifyContent: 'space-around',
              }}>
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
              text={strings.Show}
              onChangeText={text => updateArray({pass: text})}
              value={pass}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate(navigationStrings.OTP)}>
                <Text style={styles.orText}>{strings.OTP}</Text>
              </TouchableOpacity>

              <Text style={styles.text}>{strings.Forget}</Text>
            </View>
          </View>
          </View>
        </ScrollView>
        
        <KeyboardAvoidingView enabled={true} behavior={Platform.OS==='android'?'height':'padding'}>
          <View style={{paddingBottom:Platform.OS==='ios'?moderateScaleVertical(55):moderateScaleVertical(20)}}>
            <ButtonComponent title={strings.LOGiN} onpress={onLogin} />
          </View>
        </KeyboardAvoidingView>
     
    </WrapperContainer>
  );
}
