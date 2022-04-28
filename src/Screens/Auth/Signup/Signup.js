import React from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import ButtonComponent from '../../../Components/ButtonComponent';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../styles/responsiveSize';

export default function Signup({navigation}) {
  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <View>
          <HeaderComponent
            images={images.arrow}
            topimage={true}
            title={strings.create_a_new_Account}
            title1={true}
            text={true}
            onPress={() => navigation.goBack()}
            text1={strings.Headertxt}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{width: width / 2}}>
            <TextInputComp placeholder={strings.FirstName} />
          </View>
          <View style={{width: width / 2}}>
            <TextInputComp placeholder={strings.LastName} />
          </View>
        </View>
        <TextInputComp placeholder={strings.Email} />
        <TextInputComp placeholder={strings.Mobile} />
        <KeyboardAvoidingView>
          <View style={{marginTop: moderateScaleVertical(50)}}>
            <ButtonComponent title={strings.Next} />
          </View>
        </KeyboardAvoidingView>
        </View>
        
      
    </WrapperContainer>
  );
}
