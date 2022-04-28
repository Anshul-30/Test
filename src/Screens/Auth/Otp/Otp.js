import React from 'react'
import ButtonComponent from '../../../Components/ButtonComponent'
import HeaderComponent from '../../../Components/HeaderComponent'
import TextComponent from '../../../Components/TextComponent'
import WrapperContainer from '../../../Components/WrapperContainer'
import images from '../../../constants/imagePath'
import strings from '../../../constants/lang'
import navigationStrings from '../../../navigation/navigationStrings'
import colors from '../../../styles/colors'

export default function Otp({navigation}) {
  return (
    <WrapperContainer>
      <HeaderComponent
      topimage={true}
      images={images.arrow}
      onPress={()=>navigation.goBack()}
      // title1={true}
      // text={true}
      // text1={strings.edit}
      // styletxt={{color:colors.blueC}}
      // title={strings.HeaderOtp}
      />
      <TextComponent/>
      <TextComponent text1='eh'/>
       <ButtonComponent title={strings.Verify} onpress={()=>navigation.navigate(navigationStrings.Password)}/> 
    </WrapperContainer>

  )
}
