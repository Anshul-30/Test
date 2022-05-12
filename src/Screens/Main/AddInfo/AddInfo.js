import {useFocusEffect} from '@react-navigation/native';
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
import {set} from 'react-native-reanimated';
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
  // -------------------- States and params ------------------------

  const image = route?.params?.selectPhoto;
  console.log('image>>>>-----------', image);
  const [state, setState] = useState({
    description: '',
    location: '',
    selectedPhoto: [image],
    // photoToUpload: '',
    imageType: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const {description, location, selectedPhoto, imageType, photoToUpload} =
    state;
  console.log('post>>>>>>>>>>', selectedPhoto);
  const updateState = data => setState(state => ({...state, ...data}));


  // useFocusEffect(
  //   React.useCallback(() => {
  //     updateState({
  //       selectedPhoto: [
  //         ...selectedPhoto,
  //         'http://192.168.100.101:8002/uploads/1652348639658.png',
  //       ],
  //     });
  //   }, [])
  // );

  // useEffect(() => {
  //   if (image) {
  //     // _imageUpload(image);
  //     updateState({
  //       selectedPhoto: [...selectedPhoto,'http://192.168.100.101:8002/uploads/1652348639658.png'],
  //     });
  //   }
  // }, []);

  // -------------------------api hit ---------------------------

  const _imageUpload = data => {
    console.log(data, 'data>>>');
    setIsLoading(true);
    const form = new FormData();
    form.append('image', data);
    actions
      .imageUpload(form, {'Content-Type': 'multipart/form-data'})
      .then(res => {
        console.log(res, 'imageUpload>>res');
        setIsLoading(false);
        updateState({
          selectedPhoto: [...selectedPhoto, res?.data],
        });
        // alert('upload image');
      })
      .catch(err => {
        alert(err?.message);
      });
  };

  // -----------------------------Open Gallery-----------------------------

  const _selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(res => {
        console.log('res', res);
        // updateState({
        //   // selectedPhoto: selectedPhoto.concat(res.path || res.sourceURL),
        //   imageType: res?.mime,
        // });
        let data = {
          uri: res?.path,
          name: `${(Math.random() + 1).toString(36).substring(7)}.jpg`,
          type: res?.mime,
        };
        _imageUpload(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // ----------------------------remove image ---------------------

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

  // --------------------------Open Camera -----------------------------
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

  // ------------------------------alert-------------------------
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

  // --------------------------function of post --------------------------
  const _onSubmitPostAdd = () => {
    setIsLoading(true);
    let data = new FormData();
    data.append('description', 'Anshul Modi');
    data.append('latitude', '30.73333');
    data.append('longitude', '76.7994');
    data.append('location_name', 'Ambala');
    data.append('type', 1);
    selectedPhoto.map((item, index) => {
      data.append('images[]', item);
    });
    // data.append('images[0]',image)
    // data.append('images[1]',)

    console.log('Post', data);
    actions
      .postSend(data, {'Content-Type': 'multipart/form-data'})
      .then(res => {
        console.log('data', res);
        alert('post succesfully');
        setIsLoading(false);
        navigation.goBack();
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
        {isLoading ? <ActivityIndicator accessibilityViewIsModal={true} text/> : null}
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
