import React, { useState } from 'react'
import { ScrollView,KeyboardAvoidingView ,Platform,View} from 'react-native'
import ButtonComponent from '../../../Components/ButtonComponent'

import HeaderComponent from '../../../Components/HeaderComponent'
import TextComponent from '../../../Components/TextComponent'
import TextInputComp from '../../../Components/TextInputComponent'
import WrapperContainer from '../../../Components/WrapperContainer'
import images from '../../../constants/imagePath'
import strings from '../../../constants/lang'
import { moderateScaleVertical } from '../../../styles/responsiveSize'
import styles from './styles'

export default function Password({navigation}) {
  const [isVisible, setIsVisible] = useState()
  const [isCVisible, setIsCVisible] = useState()

  return (
   <WrapperContainer>
       <HeaderComponent topimage={true} images={images.arrow} onPress={()=>navigation.goBack()}/>
       <ScrollView>
        <TextComponent text1={strings.SetPassword} styletxt={styles.text}/>
        <TextComponent text1={strings.passwordtxt}styletxt={styles.text1}/>
        <TextInputComp 
        placeholder={strings.Password}
        righttxt={true}
        secureTextEntry={isVisible}
        onRightPress={()=>setIsVisible(!isVisible)}
        text={isVisible?'Show':'Hide'}
        />
        <TextInputComp
        
        placeholder={strings.Password}
        righttxt={true}
        secureTextEntry={isCVisible}
        onRightPress={()=>setIsCVisible(!isCVisible)}
        text={isCVisible?'Show':'Hide'}/>
       </ScrollView>
       <KeyboardAvoidingView behavior={Platform.OS==='android'?'height':'padding'}>
        <View style={{paddingBottom:Platform.OS==='ios'?moderateScaleVertical(50):moderateScaleVertical(20)}}>

        <ButtonComponent title='Password'/>
        </View>
       </KeyboardAvoidingView>
   </WrapperContainer>
  )
}
