import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
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
        <ScrollView scrollEnabled={false}>
          <View>
            <HeaderComponent
              images={images.arrow}
              topimage={true}
              title={strings.Welcome_back}
              title1={true}
              text={true}
              onPress={() => navigation.goBack()}
              text1={strings.Headertxt}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
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
        </ScrollView>
        <KeyboardAvoidingView enabled={true}>
          <View style={{marginTop: moderateScaleVertical(45)}}>
            <ButtonComponent title={strings.LOGiN} onpress={onLogin} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </WrapperContainer>
  );
}
