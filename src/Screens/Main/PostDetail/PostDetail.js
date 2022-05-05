import { ImageBackground, StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import WrapperContainer from '../../../Components/WrapperContainer'
import imagePath from '../../../constants/imagePath'
import { height, moderateScale, width } from '../../../styles/responsiveSize'

export default function PostDetail({navigation,route}) {
    const data = route?.params?.item
    console.log("ufhd",data)
  return (
    
      <ImageBackground source={imagePath.post1} style={{height:height,width:width}}>
      <View>
{/* <Image source={imagePath.profile} style={styles.userImage}/> */}
      </View>
      </ImageBackground>
          
  )
}

const styles = StyleSheet.create({
  userImage:{
height:moderateScale(height/10),

  }
})