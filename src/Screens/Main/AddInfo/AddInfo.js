import {cloneDeep} from 'lodash';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonComponent from '../../../Components/ButtonComponent';
import HeaderComponent from '../../../Components/HeaderComponent';
import TextInputComp from '../../../Components/TextInputComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import {POST_SEND} from '../../../config/urls';
import imagePath from '../../../constants/imagePath';
import actions from '../../../redux/actions';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../styles/responsiveSize';
import {apiPost} from '../../../utils/utils';
export default function AddInfo({navigation, route}) {
  const image = route?.params?.selectPhoto;
  console.log('image>>>>', image);
  const [state, setState] = useState({
    description: '',
    location: '',
    selectedPhoto: [],
    // photoToUpload: [],
    imageType: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const {description, location, selectedPhoto, imageType} = state;

  useEffect(() => {
    if (image) {
      _imageUpload(image);
    }
  }, []);

  const _imageUpload = data => {
    console.log(data, 'data>>>');
    const form = new FormData();
    form.append('image', data);
    actions
      .imageUpload(form, {'Content-Type': 'multipart/form-data'})
      .then(res => {
        console.log(res, 'imageUpload>>res');
        updateState({
          selectedPhoto: [...selectedPhoto, res?.data],
        });
        // alert('upload image');
      })
      .catch(err => {
        alert(err?.message);
      });
  };
  console.log('post>>>>>>>>>>', selectedPhoto);
  const updateState = data => setState(state => ({...state, ...data}));

  const _selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(res => {
        console.log('res', res);
        updateState({
          // selectedPhoto: selectedPhoto.concat(res.path || res.sourceURL),
          imageType: res?.mime,
        });
        let data={
          uri: res?.path,
          name: `${(Math.random() + 1).toString(36).substring(7)}.jpg`,
          type: `image/jpeg`,
        }
     _imageUpload(data)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const _cancelImage = index => {
    console.log('index', index);
    console.log('post for update', selectedPhoto);
    // let newArray=[...selectedPhoto]
    let newArray = cloneDeep(selectedPhoto);
    newArray.splice(index, 1);
    updateState({
      selectedPhoto: newArray,
    });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(res => {
      console.log('response', res);

      updateState({selectedPhoto: selectedPhoto.concat(res?.path)});
    });
  };
  const createAlert = () => {
    Alert.alert('album', 'select a photo', [
      {
        text: 'cancel',
      },
      {
        text: 'Open gallery',
        onPress: _selectImage,
      },
      {
        text: ' Open Camera',
        onPress: openCamera,
      },
    ]);
  };

  const _onSubmitPostAdd = () => {
    let data = new FormData();
    console.log(selectedPhoto, 'selectedPhoto');
    selectedPhoto.map((item, index) => {
      console.log('item', item);
      data.append('images[]', {
        uri: item,
        name: `${(Math.random() + 1).toString(36).substring(7)}.jpg`,
        type: imageType,
      });
    });

    data.append('description', description);
    data.append('latitude', '30.73333');
    data.append('longitude', '76.7994');
    data.append('location_name', location);
    data.append('type', 1);

    console.log('Post', data);
    actions
      .postSend(data, {'Content-Type': 'multipart/form-data'})
      .then(res => {
        console.log('data', res);
        alert('post succesfully');
      })
      .catch(err => {
        console.log(err);
        alert(err?.message);
      });
  };
  return (
    <WrapperContainer>
      <HeaderComponent
        onPress={() => navigation.goBack()}
        leftimage={true}
        images={imagePath.arrow}
        text={true}
        headerTxt={'Add Info'}
      />
      <ScrollView bounces={false}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: moderateScaleVertical(20),
            marginLeft: moderateScale(15),
          }}>
          {selectedPhoto
            ? selectedPhoto.map((element, index) => {
                console.log('imag>>>>', element);
                return (
                  <View
                    style={{
                      marginBottom: moderateScale(15),
                      marginRight: moderateScale(15),
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{uri: element}}
                      style={{
                        height: moderateScale(width / 6),
                        width: moderateScale(width / 6),
                        borderRadius: moderateScale(10),
                      }}
                    />
                    <View style={{position: 'absolute', right: -10, top: -5}}>
                      <TouchableOpacity onPress={() => _cancelImage(index)}>
                        <Image
                          source={imagePath.cancel}
                          style={{
                            height: moderateScale(width / 18),
                            width: moderateScale(width / 18),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            : null}
          {selectedPhoto.length <= 4 ? (
            <TouchableOpacity onPress={createAlert}>
              <View
                style={{
                  height: moderateScale(width / 6),
                  width: moderateScale(width / 6),
                  backgroundColor: colors.bgColor,
                  // marginHorizontal: moderateScale(15),
                  borderRadius: moderateScale(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={imagePath.post} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => alert('u can select only upto 5 photos')}>
              <View
                style={{
                  height: moderateScale(width / 6),
                  width: moderateScale(width / 6),
                  backgroundColor: colors.bgColor,
                  // marginHorizontal: moderateScale(15),
                  borderRadius: moderateScale(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={imagePath.post} />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TextInputComp
          multiline={true}
          onChangeText={text => updateState({description: text})}
          placeholder={'Write Descriptin here ....'}
          textStyle={{height: moderateScale(height / 7), textAlign: 'auto'}}
        />
        <TextInputComp
          placeholder={'Add Location'}
          onChangeText={text => updateState({location: text})}
        />
      </ScrollView>
      <KeyboardAvoidingView>
        <View
          style={{
            paddingBottom:
              Platform.OS === 'ios'
                ? moderateScaleVertical(50)
                : moderateScaleVertical(24),
          }}>
          <ButtonComponent title={'POST'} onpress={_onSubmitPostAdd} />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
