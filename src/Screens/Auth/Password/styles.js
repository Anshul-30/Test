import React from "react";
import {StyleSheet} from 'react-native'
import colors from "../../../styles/colors";
import { moderateScaleVertical, textScale } from "../../../styles/responsiveSize";

export default styles = StyleSheet.create({
    text:{
        fontSize: textScale(24),
        color: colors.white,
    },
    text1:{
        paddingTop:moderateScaleVertical(10),
        
    },
    main:{
        marginTop:moderateScaleVertical(25)
    }
})