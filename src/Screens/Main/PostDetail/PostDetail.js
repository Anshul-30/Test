import React from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { height, moderateScale, width } from '../../../styles/responsiveSize'

export default function PostDetail({navigation,route}) {
    const data = route?.params?.item
    console.log("ufhd",data)
  return (
   

      <ImageBackground source={data?.postImage} style={{height:height,width:width}}>
      <View Style={styles.container}>
        <Image source={data?.userImg} style={styles.userImage}/>
      </View>
      </ImageBackground>
   
          
  )
}

const styles = StyleSheet.create({
  userImage:{
height:moderateScale(width/10),
width:moderateScale(width/10),
borderRadius:moderateScale(width/20)

  },
  // container:{
  //   marginTop:moderateScaleVertical(125),
  //   backgroundColor:'red'
  // }
})