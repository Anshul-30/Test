import React from 'react'
import {StyleSheet} from 'react-native'
import colors from '../../../styles/colors'
import { moderateScale, textScale } from '../../../styles/responsiveSize'

const styles = StyleSheet.create({
text:{
    margin: moderateScale(15),
    color: colors.blueC,
    fontSize: textScale(13),
},
orText:{
    margin: moderateScale(15),
    color: colors.white,
    fontSize: textScale(13),
}
})

export default styles