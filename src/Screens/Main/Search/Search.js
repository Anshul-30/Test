import { StyleSheet, Text,  View } from 'react-native'
import React from 'react'
import WrapperContainer from '../../../Components/WrapperContainer'
import TextInputComp from '../../../Components/TextInputComponent'
import strings from '../../../constants/lang'

export default function Search() {
  return (
    <WrapperContainer>
      <TextInputComp righttxt={true} text={strings.ENTER_LOCATION_MANUALLY}/>
    </WrapperContainer>
  )
}

const styles = StyleSheet.create({})