import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';

import {useSelector} from 'react-redux';
import WrapperContainer from '../../../Components/WrapperContainer';
import actions from '../../../redux/actions';

export default function Home() {
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
        <Text style={{color: 'white'}}>Home</Text>
        <Text>{User}</Text>
        <Text style={{color: 'white'}}>{user}</Text>
        <TouchableOpacity onPress={signOut}>
          <Text style={{color: 'white'}}>LOGOUT</Text>
        </TouchableOpacity>
      </WrapperContainer>
    </>
  );
}
