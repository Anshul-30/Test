import React, {useState} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView
} from 'react-native';

import ButtonComponent from '../../../Components/ButtonComponent';
import CountryCode from '../../../Components/CountryCode';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextComponent from '../../../Components/TextComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';

export default function Signup({navigation}) {
  const [phone, setPhone] = useState('');
  return (
    <View style={{flex:1, backgroundColor: colors.themeColor}}>
      {/* <SafeAreaView style={{flex:1}}> */}
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} style={{flex: 1}}>
        <View style={{flex:1, marginTop:Platform.OS=='ios'? moderateScaleVertical(44):moderateScaleVertical(5)}}>
          <View>
            <HeaderComponent
              images={images.arrow}
              topimage={true}
              // title={strings.create_a_new_Account}
              // title1={true}
              // text={true}
              onPress={() => navigation.goBack()}
              // text1={strings.Headertxt}
            />
            <TextComponent text1={strings.create_a_new_Account} styletxt={{fontSize: textScale(24),
     color: colors.white}}/>
     <TextComponent text1={strings.Headertxt}/>
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
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.4}}>
              <CountryCode />
            </View>
            <View style={{flex: 0.6}}>
              <TextInputComp
                placeholder={strings.Mobile}
                onChangeText={text => updateArray({phone: text})}
                value={phone}
              />
            </View>
          </View>
          <KeyboardAvoidingView behavior={Platform.OS =='android'? 'height': 'padding'}>
            <View style={{paddingBottom: Platform.OS=='ios'?moderateScaleVertical(55):moderateScaleVertical(20)}}>
              <ButtonComponent title={strings.Next} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      {/* </SafeAreaView> */}
    </View>
  );
}
