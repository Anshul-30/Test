import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Image,View, PermissionsAndroid,FlatList,Text} from 'react-native';
import WrapperContainer from '../../../Components/WrapperContainer';
import CameraRoll from '@react-native-community/cameraroll';

import strings from '../../../constants/lang';
import colors from '../../../styles/colors';
import { moderateScale, moderateScaleVertical, textScale, width } from '../../../styles/responsiveSize';

export default function Post() {
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

  return (
    <WrapperContainer>
      <View style={{marginVertical:moderateScaleVertical(20),marginHorizontal:moderateScale(15)}}>

      <Text style={{color:colors.white,fontSize:textScale(22)}}>{strings.ADDED_NEW_POST}</Text>
      </View>
      <View style={{backgroundColor:colors.bgColor,borderTopLeftRadius:15,borderTopRightRadius:15,height:50,width:width}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:moderateScale(45)}}>
      <Text>
        hdfjkdkjvfhtthty yhtyj htyjhyt hyjyuj hytj bghj nbgnj njny jyugrth gtr grt 
      </Text>
      <Text>fcjiehfrierh</Text>
      </View>
      </View>
      <FlatList data={photos} 
      renderItem={(element,index)=>{
        console.log("element",element)
        return(
          <Image source={{uri:element.item.node.image.uri}} style={{height:100,width:150}}/>        )

      }}

      numColumns={3}
      />
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
