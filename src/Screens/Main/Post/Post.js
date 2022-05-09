import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  PermissionsAndroid,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import WrapperContainer from '../../../Components/WrapperContainer';
import CameraRoll from '@react-native-community/cameraroll';
import ImagePicker from 'react-native-image-crop-picker';
import strings from '../../../constants/lang';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../navigation/navigationStrings';


export default function Post({navigation,route}) {
  const [state, setState] = useState({
    photos: [],
  });

  const {photos} = state;
  useEffect(() => {
    _hasGalleryPermission();
  }, []);
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const _hasGalleryPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'Photos',
    })
      .then(r => {
        setState({photos: r.edges});
        console.log('image>>>>', r);
      })
      .catch(err => {
        console.log('erre', err);
        //Error Loading Images
      });
  };
const openCamera =()=>{
ImagePicker.openCamera({
  width: 300,
  height: 400,
  cropping: true,
}).then(res => {
  console.log('response', res);
 
  });

}
  return (
    <WrapperContainer>
      <View
        style={{
          marginVertical: moderateScaleVertical(20),
          marginHorizontal: moderateScale(15),
        }}>
        <Text style={{color: colors.white, fontSize: textScale(22)}}>
          {strings.SELECT_PHOTO}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors.bgColor,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 50,
          width: width,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: moderateScale(45),
          }}>
          <Text style={{color:colors.white,fontSize:textScale(15),padding:moderateScale(10)}}>
           Gallery
          </Text>
        </View>
      </View>
      <FlatList
        data={photos}
        renderItem={(element, index) => {
          console.log('element', element);
          return (
            <TouchableOpacity onPress={()=>navigation.navigate(navigationStrings.ADD_INFO,{image:element.item.node.image})}>

            <Image
              source={{uri: element.item.node.image.uri}}
              style={{height: width/5,width:width/3,resizeMode:'cover'}}
            />
            </TouchableOpacity>
          );
        }}
        numColumns={3}
      />
      <TouchableOpacity onPress={openCamera}>

      <Image source={imagePath.camera} style={{height:width/8,width:width/8,position:'absolute',right:10,bottom:15}}/>
      </TouchableOpacity>
      {/* <ScrollView> 
      {state.photos.map((p, i) => {
      return (
        <Image
          key={i}
          style={{
            width: 300,
            height: 100,
          }}
          source={{ uri: p.node.image.uri }}
        />
      );
    })}
      
       </ScrollView> */}
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
