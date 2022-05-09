import {StyleSheet, Text, View, Image,TouchableOpacity,ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import React, { useState } from 'react';
import WrapperContainer from '../../../Components/WrapperContainer';
import HeaderComponent from '../../../Components/HeaderComponent';
import imagePath from '../../../constants/imagePath';
import ImagePicker from 'react-native-image-crop-picker';
import TextInputComp from '../../../Components/TextInputComponent';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import ButtonComponent from '../../../Components/ButtonComponent';
export default function AddInfo({navigation, route}) {
  const image = route?.params?.image;
  const [state,setState]= useState({
      description:'',
      location:'',
      post:[]
  })
  const {description,location,post}= state
  const updateState =(data)=>setState(state=>({...state,...data}))
  console.log('image>', image);
    const _selectImage = ()=>{
        ImagePicker.openPicker({
            width:300,
            height:400,
            cropping:true
        }).then((res)=>{
            console.log('res',res)
updateState({})
        })
    }


  return (
    <WrapperContainer>
      <HeaderComponent
        onPress={() => navigation.goBack()}
        leftimage={true}
        images={imagePath.arrow}
        text={true}
        headerTxt={'Add Info'}
      />
      <ScrollView bounces={false}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: moderateScaleVertical(20),
            marginHorizontal: moderateScale(15),
          }}>
          <Image
            source={{uri: image?.uri}}
            style={{
              height: moderateScale(width / 6),
              width: moderateScale(width / 6),
              borderRadius: moderateScale(10),
            }}
          />
          <TouchableOpacity onPress={_selectImage}>

          <View
            style={{
              height: moderateScale(width / 6),
              width: moderateScale(width / 6),
              backgroundColor: colors.bgColor,
              marginHorizontal: moderateScale(15),
              borderRadius: moderateScale(10),
              justifyContent:'center',
              alignItems:'center'
            }}>
                <Image source={imagePath.post}/>
            </View>
          </TouchableOpacity>
              
        </View>
        <TextInputComp
          multiline={true}
          placeholder={'Enter Descriptin here ....'}
          textStyle={{height: moderateScale(height / 7), textAlign: 'auto'}}
        />
        <TextInputComp placeholder={'Add Location'} />
      </ScrollView>
      <KeyboardAvoidingView>
<View style={{paddingBottom:Platform.OS==='ios'?moderateScaleVertical(50):moderateScaleVertical(24)}}>

      <ButtonComponent/>
</View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
