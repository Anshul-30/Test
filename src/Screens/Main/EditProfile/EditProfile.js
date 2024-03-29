import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
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
import {showSuccess} from '../../../utils/helperFunction';

export default function EditProfile({navigation, route}) {
  const data = useSelector(state => state.userLogin.userData);
  console.log('userdata', data);
  console.log("profile Image",profileImage)
  const [countryCode, setCountryCode] = useState('91');
  const [countryFlag, setCountryFlag] = useState('IN');

  const [state, setState] = useState({
    profileImage: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    imgeType: null,
  });

  useEffect(() => {
    if (data) {
      setState({
        firstName: data?.first_name,
        lastName: data?.last_name,
        email: data?.email,
        phoneNumber: data?.phone,
        profileImage: data?.profile,
      });
      setCountryCode(data.phone_code);
      setCountryFlag(data.country_code);
    }
  }, [data]);

  const {profileImage, firstName, lastName, email, phoneNumber, imgeType} =
    state;
  const [isLoading, setIsLoading] = useState(false);
  const updateState = data => setState(state => ({...state, ...data}));

  // --------------------------------FormData  ----------------------

  const _submitEditProfileData = () => {
    console.log(profileImage, "submitEditProfileData")
    let form = new FormData();
    form.append('first_name', firstName);
    form.append('last_name', lastName);
    form.append('email', email);
    form.append('image', {
      uri: profileImage,
      name: `${(Math.random() + 1).toString(36).substring(7)}.jpg`,
      type: imgeType,
    });
    // let apiData = {
    //   first_name: firstName,
    //   last_name: lastName,
    //   email: email,
    //   phone:phoneNumber

    // }

    actions
      .editProfile(form, {'Content-Type': 'multipart/form-data'})
      .then(res => {
        console.log('editProfile api res_+++++', res);
        alert('profile updated');
        // showSuccess()
        navigation.goBack();
      })
      .catch(err => {
        console.log(err, 'err');
        alert(err?.message);
      });
  };

  // ------------------------Image picker-------------------------

  const _imagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(res => {
      console.log('response', res.path);
      _imageUpload(res?.path);
      // updateState({
      //   profileImage: res?.sourceURL || res?.path,
      //   imgeType: res?.mime,
      // });
    });
  };

  const _imageUpload = data => {
    console.log(data, 'data>>>');
    setIsLoading(true);
    const form = new FormData();
    form.append('image', {
      uri: data,
      name: `${(Math.random() + 1).toString(36).substring(7)}.jpg`,
      type: imgeType,
    });
    actions
      .imageUpload(form, {'Content-Type': 'multipart/form-data'})
      .then(res => {
        console.log(res?.data, 'imageUpload>>res');
        updateState({profileImage: res?.data});
        console.log('profile image --------------',profileImage)
        setIsLoading(false);
        alert(res?.message);
      })
      .catch(err => {
        alert(err?.message);
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
            <Image
              source={profileImage ? {uri: profileImage} : imagePath.profile}
              style={styles.profile}
            />
            <TouchableOpacity onPress={_imagePicker}>
              <Image source={imagePath.edit} style={styles.edit} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.5}}>
              <TextInputComp
                placeholder="First Name"
                value={firstName}
                onChangeText={text => updateState({firstName: text})}
              />
            </View>
            <View style={{flex: 0.5}}>
              <TextInputComp
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => updateState({lastName: text})}
              />
            </View>
          </View>
          <TextInputComp
            placeholder={'Email'}
            value={email}
            onChangeText={text => updateState({email: text})}
          />
          {/* <View style={{flexDirection: 'row'}}>
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
          </View> */}
          {isLoading ? <ActivityIndicator /> : null}
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <View
          style={{
            paddingBottom:
              Platform.OS === 'ios'
                ? moderateScaleVertical(50)
                : moderateScaleVertical(24),
          }}>
          <ButtonComponent
            title={strings.SAVE_CHNGES}
            onpress={_submitEditProfileData}
          />
        </View>
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
