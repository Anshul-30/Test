import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  I18nManager,
  Image,
  Platform
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../../Components/WrapperContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import TextInputComp from '../../../Components/TextInputComponent';
import CountryCode from '../../../Components/CountryCode';
import ButtonComponent from '../../../Components/ButtonComponent';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../styles/responsiveSize';
import {useSelector} from 'react-redux';

export default function Edit_Profile({navigation, route}) {
  const data = useSelector(state => state.userLogin.userData);
  const [state, setState] = useState({
    fName: '',
    lName: '',
    email: '',
    phone: '',
  });
  useEffect(() => {
    if (data) {
      setState({
        fName: data.first_name,
        lName: data.last_name,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data]);

  const {fName, lName, email, phone} = state;
  const updateArray = data => setState(state => ({...state, ...data}));
  return (
    <WrapperContainer>
      <HeaderComponent
        leftimage={true}
        onPress={() => navigation.goBack()}
        images={imagePath.arrow}
        text={true}
        headerTxt={strings.EDIT_PROFILE}
      />
      <ScrollView>
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: moderateScaleVertical(30),
            }}>
            <Image
              source={imagePath.Profile}
              style={{
                height: moderateScale(width / 4),
                width: moderateScale(width / 4),
                borderRadius: moderateScale(width / 8),
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.5}}>
              <TextInputComp
                value={fName}
                onChangeText={text => updateArray({fName: text})}
              />
            </View>
            <View style={{flex: 0.5}}>
              <TextInputComp
                value={lName}
                onChangeText={text => updateArray({lName: text})}
              />
            </View>
          </View>
          <TextInputComp
            value={email}
            onChangeText={text => updateArray({email: text})}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.4}}>
              <CountryCode />
            </View>
            <View style={{flex: 0.6}}>
              <TextInputComp
                value={phone}
                onChangeText={text => updateArray({phone: text})}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'android'? 'height':'padding'}>
        <ButtonComponent title={'Save Changes'} />
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
