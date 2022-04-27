import Reacr from 'react'
import {StyleSheet} from 'react-native'
import colors from '../../../styles/colors'
import { height, moderateScale, moderateScaleVertical, textScale, width } from '../../../styles/responsiveSize'
const styles = StyleSheet.create({
    btn:{
        backgroundColor:'white',
        marginVertical:moderateScaleVertical(10)
    },
    text:{
        color:colors.black,
    },
    text1:{
        textAlign:'center',
        color:colors.text,
        padding:moderateScale(7),
    },
    images:{
        justifyContent:'center',
        resizeMode:'contain',
        height:moderateScale(height-height/1.5),
        width:moderateScale(width-width/1.5)
        
    },
    // login:{
    //     paddingTop:moderateScaleVertical(0)
    // },
    ortext:{
        color:colors.white,
        textAlign:'center',
        padding:moderateScale(7),
        fontSize:textScale(15)
    }

})

export default styles