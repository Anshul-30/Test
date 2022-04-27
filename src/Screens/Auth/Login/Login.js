import React, { useEffect } from 'react';
import {Text, SafeAreaView, View, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonComponent from '../../../Components/ButtonComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'

import styles from './styles';


export default function Login({navigation}) {

//   useEffect(() => {
//     GoogleSignin.configure()
// }, [])

// const googleLogin = async () => {
//     try {
//         await GoogleSignin.hasPlayServices();
//         const userInfo = await GoogleSignin.signIn();
//         console.log("userInfo", userInfo)
//         // const email = userInfo.user.email;
//         // const userId = userInfo.user.id;
//         // const data = { email, userId }
//         // actions.login(data)

//         const data = userInfo?.user
//         // dispatch(Login1(data))
//         // this.setState({ userInfo });
//     } catch (error) {
//         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//             console.log("error", error)
//         } else if (error.code === statusCodes.IN_PROGRESS) {
//             // operation (e.g. sign in) is in progress already
//             console.log("error", error)
//         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             // play services not available or outdated
//             console.log("error", error)
//         } else {
//             // some other error happened
//             console.log("error", error)
//         }
//     }
// };

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
       onpress={()=>navigation.navigate(navigationStrings.LoginWithPhone)}
      />

      <View style={{flex: 0.6}}>
        <View>
          <Text style={styles.ortext}>or</Text>
        </View>
        <ButtonComponent
          stylbtn={styles.btn}
          title={strings.GOOGLE}
          textstyle={styles.text}
          leftimage={true}
          image={images.google}
          // onpress={googleLogin}
        />
        <ButtonComponent
          stylbtn={styles.btn}
          title={strings.FACEBOOK}
          textstyle={styles.text}
          leftimage={true}
          image={images.facebook}
        />

        <ButtonComponent
          stylbtn={styles.btn}
          title={strings.Apple}
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
            {strings.New_Here}
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate(navigationStrings.Signup)} >

          <Text style={{color: '#41CCFF', fontSize: textScale(14)}}>
            {strings.Sign_up}
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperContainer>
  );
}
