import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import ButtonComponent from '../../../Components/ButtonComponent';
import CountryCode from '../../../Components/CountryCode';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import actions from '../../../redux/actions';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../styles/responsiveSize';
import {showError} from '../../../utils/helperFunction';
import validator from '../../../utils/validations';
import ImagePicker from 'react-native-image-crop-picker';

export default function EditProfile({navigation, route}) {
  const data = useSelector(state => state.userLogin.userData);

  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');

  const [state, setState] = useState({
    profileImage:'',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    imgeType:null
  });

  useEffect(() => {
    if (data) {
      setState({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phoneNumber: data.phone,
      });
      setCountryCode(data.phone_code);
      setCountryFlag(data.country_code);
    }
  }, [data]);

  const {profileImage,firstName, lastName, email, phoneNumber} = state;

  const updateState = data => setState(state => ({...state, ...data}));

  const isValidData = () => {
    const error = validator({firstName, lastName, email, phoneNumber});
    if (error) {
      showError(error);
      return;
    }
    return true;
  };

  const _submitEditProfileData = () => {
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }

    // let formaData = new FormData();
    // formaData.append('first_name', firstName);
    // formaData.append('last_name', lastName);
    // formaData.append('email', email);
    // formaData.append('image', {
    //   uri: '',
    //   name: `${(Math.random() + 1).toString(36).substring(7)}.jpg`,
    //   type: 'image/jpeg',
    // });
    // console.log(formaData, 'formaData');

    // actions
    //   .editProfile(formaData, {'Content-Type': 'multipart/form-data'})
    //   .then(res => {
    //     console.log('editProfile api res_+++++', res);
    //   })
    //   .catch(err => {
    //     console.log(err, 'err');
    //     alert(err?.message);
    //   });
  };

  const _imagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(res => {
      console.log("duyeuf",res);
      updateState({
        profileImage:res?.sourceURL || res?.path,
        imageType:res?.mime
      })
    });
  };
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
          <View style={styles.mainContainer}>
            <Image source={profileImage?{ uri: profileImage}:imagePath.profile} style={styles.profile} />
            <TouchableOpacity onPress={_imagePicker}>
              <Image source={imagePath.edit} style={styles.edit} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.5}}>
              <TextInputComp
                value={firstName}
                onChangeText={text => updateState({firstName: text})}
              />
            </View>
            <View style={{flex: 0.5}}>
              <TextInputComp
                value={lastName}
                onChangeText={text => updateState({lastName: text})}
              />
            </View>
          </View>
          <TextInputComp
            value={email}
            onChangeText={text => updateState({email: text})}
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
                value={phoneNumber}
                onChangeText={text => updateState({phoneNumber: text})}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ButtonComponent
          title={strings.SAVE_CHNGES}
          onpress={_submitEditProfileData}
        />
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  edit: {
    height: moderateScale(width / 15),
    width: moderateScale(width / 15),
    alignSelf: 'flex-end',
    marginTop: moderateScaleVertical(70),
    marginLeft: moderateScale(-30),
  },
  profile: {
    height: moderateScale(width / 3.5),
    width: moderateScale(width / 3.5),
    borderRadius: moderateScale(width / 7),
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(30),
    flexDirection: 'row',
  },
});
