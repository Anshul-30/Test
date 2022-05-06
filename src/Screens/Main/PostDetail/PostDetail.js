import React from 'react';
import {Image, ImageBackground, StyleSheet, View, Text,Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ButtonComponent from '../../../Components/ButtonComponent';
import imagePath from '../../../constants/imagePath';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';

export default function PostDetail({navigation, route}) {
  const data = route?.params?.item;
  console.log('ufhd', data);
  return (
    <ImageBackground
      source={data?.postImage}
      style={{height: height, width: width}}>
        <View style={{flex:1}}>

      <View style={styles.container}>
        <View style={{flexDirection: 'row',flex:1}}>
          <Image source={data?.userImg} style={styles.userImage} />
          <View style={{flex:.9 ,marginLeft:moderateScale(10)}}>
            <Text style={{color:colors.white,fontSize:textScale(14)}}>{data?.userName}</Text>
            <Text style={{color:colors.white,fontSize:textScale(12)}}>{data?.place}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack() }style={{flex:.2}}>
            <Image source={imagePath.close} style={{height:moderateScale(width/14),width:moderateScale(width/14)}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal:moderateScale(20),paddingBottom:moderateScaleVertical(15)}}>

      <Text style={{fontSize:textScale(13),color:colors.white}}>{data?.caption}</Text>
      <Text style={{color:colors.textMediumGray,paddingTop:moderateScaleVertical(10)}}>
        {data?.postTime}
      </Text>
      </View>
      <View style={{paddingBottom:moderateScaleVertical(50)}}> 

        <ButtonComponent title='View Map'/>
      </View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  userImage: {
    height: moderateScale(width / 10),
    width: moderateScale(width / 10),
    borderRadius: moderateScale(width / 20),
    // marginTop:moderateScale(30)
  },
  container: {
    marginVertical:Platform.OS==='ios'? moderateScaleVertical(50):moderateScaleVertical(20),
    marginHorizontal: moderateScale(15),
    alignItems:'center',
    flex:1
  },
});
