import React, { useEffect } from 'react';
import {Text, SafeAreaView, View, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonComponent from '../../../Components/ButtonComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
import { LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";

import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'

import styles from './styles';
import actions from '../../../redux/actions';


export default function Login({navigation}) {

  useEffect(() => {
    GoogleSignin.configure()
}, [])



const fbLogIn = (resCallBack) => {
  LoginManager.logOut();
  return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
    result => {
      console.log("fb result ****************", result);
      if (result.declinedPermissions && result.declinedPermissions.includes("email")) {
        resCallBack({ message: "Email is required" })
      }
      if (result.isCancelled) {
        console.log("dxcfgvbhjn")
      } else {
        const infoRequest = new GraphRequest(
          'me?fields= email,name, picture',
          null,
          resCallBack
        );
        new GraphRequestManager().addRequest(infoRequest).start()
      }
    },
    function (errror) {
      console.log("login failed", errror)
    }
  )
}

const _resInfoCallback = async (error, result) => {
  if (error) {
    console.log("error raised at response", error)
    return;
  }
  else {
    const userData = result
    console.log("id", userData)
   actions.saveUserData(userData)

  }
}
const onFBlogIn = async () => {
  try {
    await fbLogIn(_resInfoCallback)
    console.log("hii")
  } catch (error) {
    console.log("error", error)
  }
}




const googleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo1 = await GoogleSignin.signIn();
        console.log("userInfo", userInfo1)
        const userInfo = userInfo1?.user
      actions.saveUserData(userInfo)
        
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log("error", error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log("error", error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log("error", error)
        } else {
            // some other error happened
            console.log("error", error)
        }
    }
};

  return (
    <WrapperContainer>
      <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images.login} style={styles.images} />
        <View
          style={{
            marginTop: moderateScaleVertical(20),
            marginHorizontal: moderateScale(10),
            // paddingTop: moderateScale(5),
          }}>
          <Text style={styles.text1}>{strings.Text}</Text>
        </View>
      </View>
      <ButtonComponent
        title={strings.LOGIN}
       onpress={()=>navigation.navigate(navigationStrings.LOGIN_WITH_PHONE)}
      />

      <View style={{flex: 0.6}}>
        <View>
          <Text style={styles.ortext}>{strings.OR}</Text>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            margin: moderateScale(10),
          }}>
          <Text style={{color: colors.white, fontSize: textScale(14)}}>
            {strings.NEW_HERE}
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate(navigationStrings.SIGNUP)} >

          <Text style={{color: '#41CCFF', fontSize: textScale(14)}}>
            {strings.SIGN_UP}
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperContainer>
  );
}
