import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../Components/WrapperContainer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useSelector} from 'react-redux';
import actions from '../../../redux/actions';
import strings from '../../../constants/lang';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles/responsiveSize';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../navigation/navigationStrings';

export default function Profile({navigation, route}) {
  const data = useSelector(state => state.userLogin.userData);
  const User = data?.pass;
  const user = data?.email;
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
      actions.Logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <WrapperContainer>
        <View style={styles.container}>
          <Text style={styles.headerTxt}>{strings.Profile}</Text>
          <View style={{marginVertical: moderateScaleVertical(25)}}>
            <View style={styles.mainView}>
              <View style={{flex: 0.15}}>
                <Image source={imagePath.profileBottom} />
              </View>
              <View style={{flex: 0.5}}>
                <TouchableOpacity onPress={()=>navigation.navigate(navigationStrings.EDIT_PROFILE)}>

                <Text style={[styles.headerTxt, {fontSize: textScale(14)}]}>
                  Edit Profile
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainView}>
              <View style={{flex: 0.15}}>
                <Image source={imagePath.changePassword} />
              </View>
              <View style={{flex: 0.5}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(navigationStrings.CHANGE_PASSWORD)
                  }>
                  <Text style={[styles.headerTxt, {fontSize: textScale(14)}]}>
                    Change Password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainView}>
              <View style={{flex: 0.15}}>
                <Image source={imagePath.signOut} />
              </View>
              <View style={{flex: 0.3}}>
                <TouchableOpacity onPress={signOut}>
                  <Text style={[styles.headerTxt, {fontSize: textScale(14)}]}>
                    Signout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </WrapperContainer>
    </>
  );
}

const styles = StyleSheet.create({
  headerTxt: {
    textAlign: 'left',
    color: colors.white,
    fontSize: textScale(15),
  },
  container: {
    marginHorizontal: moderateScale(15),
    marginTop: moderateScaleVertical(24),
  },
  mainView: {
    flexDirection: 'row',
    padding: moderateScale(10),
    // justifyContent:'space-between'
  },
});
