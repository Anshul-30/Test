import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  I18nManager,
  Image,
  Platform,
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
import actions from '../../../redux/actions';

export default function Edit_Profile({navigation, route}) {
  const data = useSelector(state => state.userLogin.userData);
  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');
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
      setCountryCode(data.phone_code);
      setCountryFlag(data.country_code);
    }
  }, [data]);

  const {fName, lName, email, phone} = state;
  const all_data = {fName, lName, email, phone, countryCode, countryFlag};
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
              flexDirection:'row'
            }}>
            
              <Image
                source={imagePath.Profile}
                style={{
                  height: moderateScale(width / 3.5),
                  width: moderateScale(width / 3.5),
                  borderRadius: moderateScale(width / 7),
                }}
              />
          
            
              <Image
                source={imagePath.Edit}
                style={{
                  height: moderateScale(width / 15),
                  width: moderateScale(width / 15),
                  alignSelf:'flex-end',
                  marginTop:moderateScaleVertical(-30),
                  marginLeft:moderateScale(-30)
                  
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
              <CountryCode
                countryCode={countryCode}
                countryFlag={countryFlag}
                setCountryCode={setCountryCode}
                setCountryFlag={setCountryFlag}
              />
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ButtonComponent
          title={'Save Changes'}
          // onpress={()=>actions.login(all_data)}
        />
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
