import React from 'react';
import {Image, ImageBackground, StyleSheet, View, Text} from 'react-native';
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
        <View style={{flexDirection: 'row'}}>
          <Image source={data?.userImg} style={styles.userImage} />
          <View style={{flex:.9 ,marginLeft:moderateScale(10)}}>
            <Text>{data?.userName}</Text>
            <Text>{data?.place}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack() }style={{flex:.1}}>
            <Image source={imagePath.close} />
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
    marginVertical: moderateScaleVertical(50),
    marginHorizontal: moderateScale(15),
    alignItems:'center',
    flex:1
  },
});
