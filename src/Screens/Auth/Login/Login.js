import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ButtonComponent from '../../../Components/ButtonComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveSize';
import styles from './styles';

export default function Login({navigation, route}) {

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

// ----------------------------Login With Number ------------------------------

  const _loginWithNumber = () => {
    navigation.navigate(navigationStrings.LOGIN_WITH_PHONE);
  };
  // -------------------------Google Login ---------------------------

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo1 = await GoogleSignin.signIn();
      console.log('userInfo', userInfo1);
      const userInfo = userInfo1?.user;

      actions.saveUserData(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('error', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('error', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('error', error);
      } else {
        // some other error happened
        console.log('error', error);
      }
    }
  };



  // ----------------------Facebook Login-------------------------

  const fbLogIn = resCallBack => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('fb result ****************', result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallBack({message: 'Email is required'});
        }
        if (result.isCancelled) {
          console.log('dxcfgvbhjn');
        } else {
          const infoRequest = new GraphRequest(
            'me?fields= email,name, picture',
            null,
            resCallBack,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (errror) {
        console.log('login failed', errror);
      },
    );
  };

  const _resInfoCallback = async (error, result) => {
    if (error) {
      console.log('error raised at response', error);
      return;
    } else {
      const userData = result;
      console.log('id', userData);
      actions.saveUserData(userData);
    }
  };
  const onFBlogIn = async () => {
    try {
      await fbLogIn(_resInfoCallback);
    } catch (error) {
      console.log('error', error);
    }
  };
// -----------------Sign Up-----------------------------


const _signUp=()=>{
  navigation.navigate(navigationStrings.SIGNUP)
}


  return (
    <WrapperContainer>
      <ScrollView bounces={false}>
        <View style={styles.container}>
          <Image source={images.login} style={styles.images} />
          <View
            style={{
              marginTop: moderateScaleVertical(20),
              marginHorizontal: moderateScale(10),
              // paddingTop: moderateScale(5),
            }}>
            <Text style={styles.text1}>{strings.PRIVACY_POLICY}</Text>
          </View>
        </View>
        <View style={{marginTop: moderateScaleVertical(15)}}>
          <ButtonComponent
            title={strings.LOGIN}
            onpress={_loginWithNumber}
          />
        </View>

        <View style={{flex: 0.6}}>
          <View>
            <Text style={styles.orText}>{strings.OR}</Text>
          </View>
          <ButtonComponent
            stylbtn={styles.btn}
            title={strings.GOOGLE}
            textstyle={styles.text}
            leftimage={true}
            image={images.google}
            onpress={googleLogin}
          />
          <ButtonComponent
            stylbtn={styles.btn}
            title={strings.FACEBOOK}
            textstyle={styles.text}
            leftimage={true}
            image={images.facebook}
            onpress={onFBlogIn}
          />

          <ButtonComponent
            stylbtn={styles.btn}
            title={strings.APPLE}
            textstyle={styles.text}
            leftimage={true}
            image={images.apple}
          />
          <View style={styles.signUpView}>
            <Text style={styles.newHereText}>{strings.NEW_HERE}</Text>
            <TouchableOpacity
              onPress={_signUp}>
              <Text style={styles.signUpText}>{strings.SIGN_UP}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
}
