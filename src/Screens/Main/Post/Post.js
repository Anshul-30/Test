import CameraRoll from '@react-native-community/cameraroll';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList, Image, PermissionsAndroid, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderComponent from '../../../Components/HeaderComponent';
import Loader from '../../../Components/Loader';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale, textScale,
  width
} from '../../../styles/responsiveSize';

export default function Post({navigation, route}) {

  // --------------------Satets-------------------

  const [state, setState] = useState({
    photos: [],
    selectPhoto: '',
    filename: '',
  });

  const {photos, selectPhoto, filename} = state;
  const updateState = data => setState(state => ({...state, ...data}));
  const [isLoading, setIsLoading] = useState(false)
  console.log('show Photo', selectPhoto);


  useEffect(() => {
    _hasGalleryPermission();
  }, []);



  // --------------------------permissions -------------------


  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  // --------------------------get photos from gallery -------------------


  const _hasGalleryPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'Photos',
     
    })
      .then(r => {
        updateState({photos: r.edges});
        console.log('image>>>>', r);
        updateState({selectPhoto: r.edges[0].node.image.uri});
      })
      .catch(err => {
        console.log('erre', err);
        //Error Loading Images
      });
  };




  // -------------------------------Open camera --------------------

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(res => {
      console.log('response', res);

      navigation.navigate(navigationStrings.ADD_INFO, {
        selectPhoto: res?.path,
      });
    });
  };


  // ------------------------Image select -------------------------
  const _selectImage = element => {
    console.log('index', element.item);
    updateState({
      selectPhoto: element.item.node.image.uri,
      filename: element.item.node.image.filename,
    });
  };

  // ----------------------navigation function --------------------

  const _goToAddInfoPage = () => {
    _imageUpload()
    
  };
// ------------------------Api Hit ----------------------------------
  const _imageUpload = () => {
    // console.log(data, 'data>>>');
    setIsLoading(true)
    const form = new FormData();
    form.append('image', {
      
        uri: selectPhoto,
        name: `${(Math.random() + 1).toString(36).substring(7)}.jpg`,
        type: `image/jpeg`,
      },
    );
    actions
      .imageUpload(form, {'Content-Type': 'multipart/form-data'})
      .then(res => {
        console.log(res, 'imageUpload>>res');
        if(res){
          navigation.navigate(navigationStrings.ADD_INFO,{
            selectPhoto:res?.data
          })
        }
        setIsLoading(false)
        // updateState({
        //   selectedPhoto: [...selectedPhoto, res?.data],
        // });
        // alert('upload image');
      })
      .catch(err => {
        // alert(err?.message);
      });
  };
  return (
    <WrapperContainer isLoading={isLoading} withModal={isLoading}>
      <HeaderComponent
        leftimage={true}
        images={imagePath.arrow}
        text={true}
        headerTxt={strings.SELECT_PHOTO}
        rightimage={true}
        onPress={() => navigation.goBack()}
        rigthImage={imagePath.check}
        onpress={_goToAddInfoPage}
      />

      <Image
        source={{uri: selectPhoto}}
        style={{height: moderateScale(height / 4)}}
      />
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
          <Text
            style={{
              color: colors.white,
              fontSize: textScale(15),
              padding: moderateScale(10),
            }}>
            Gallery
          </Text>
        </View>
      </View>
      <FlatList
        data={photos}
        renderItem={(element, index) => {
          // console.log('element', element);
          return (
            <TouchableOpacity onPress={() => _selectImage(element)}>
              <Image
                source={{uri: element.item.node.image.uri}}
                style={{
                  height: width / 5,
                  width: width / 3,
                  resizeMode: 'cover',
                }}
              />
            </TouchableOpacity>
          );
        }}
        numColumns={3}
      />
      
      <TouchableOpacity onPress={openCamera}>
        <Image
          source={imagePath.camera}
          style={{
            height: width / 8,
            width: width / 8,
            position: 'absolute',
            right: 10,
            bottom: 15,
          }}
        />
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
