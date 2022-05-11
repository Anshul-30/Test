import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  PermissionsAndroid,
  FlatList,
  Text,
  TouchableOpacity,
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
import HeaderComponent from '../../../Components/HeaderComponent';

export default function Post({navigation, route}) {
  const [state, setState] = useState({
    photos: [],
    selectPhoto: '',
    filename: '',
  });

  const {photos, selectPhoto, filename} = state;
  const updateState = data => setState(state => ({...state, ...data}));
  // const [selectPhoto, setSelectPhoto] = useState()
  console.log('show Photo', selectPhoto);
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
        updateState({photos: r.edges});
        console.log('image>>>>', r);
        updateState({selectPhoto: r.edges[0].node.image.uri});
      })
      .catch(err => {
        console.log('erre', err);
        //Error Loading Images
      });
  };
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
  const _selectImage = element => {
    console.log('index', element.item);
    updateState({
      selectPhoto: element.item.node.image.uri,
      filename: element.item.node.image.filename,
    });
  };
  const _goToAddInfoPage = () => {
    navigation.navigate(navigationStrings.ADD_INFO, {
      selectPhoto: {
        uri: selectPhoto,
        name: `${(Math.random() + 1).toString(36).substring(7)}.${(filename.substring(filename.indexOf('.') + 1).toLowerCase())}`,
        type: `image/${(filename.substring(filename.indexOf('.') + 1).toLowerCase())}`,
      },
    });
  };
  return (
    <WrapperContainer>
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
          console.log('element', element);
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
