import {cloneDeep} from 'lodash';
import React, {useState} from 'react';
import {
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
import imagePath from '../../../constants/imagePath';
import colors from '../../../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../styles/responsiveSize';
export default function AddInfo({navigation, route}) {
  const image = route?.params?.image;
  const [state, setState] = useState({
    description: '',
    location: '',
    post: [],
    imageType: null,
  });
  const {description, location, post, imageType} = state;
  console.log('post>>>>>>>>>>', post);

  const updateState = data => setState(state => ({...state, ...data}));
  console.log('image>', image);

  const _selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(res => {
        console.log('res', res);
        updateState({post: post.concat(res.path || res.sourceURL)});
        // console.log('post', post);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const _cancelImage = index => {
    console.log('index', index);
    console.log('post for update', post);
    // let newArray=[...post]
    let newArray = cloneDeep(post);
    newArray.splice(index,1)
    updateState({
      post: newArray,
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
          <View>
            <Image
              source={{uri: image?.uri}}
              style={{
                height: moderateScale(width / 6),
                width: moderateScale(width / 6),
                borderRadius: moderateScale(10),
                paddingBottom: moderateScale(7),
                marginRight: moderateScale(15),
              }}
            />
          </View>

          {post
            ? post.map((element, index) => {
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

          <TouchableOpacity onPress={_selectImage}>
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
        </View>
        <TextInputComp
          multiline={true}
          placeholder={'Enter Descriptin here ....'}
          textStyle={{height: moderateScale(height / 7), textAlign: 'auto'}}
        />
        <TextInputComp placeholder={'Add Location'} />
      </ScrollView>
      <KeyboardAvoidingView>
        <View
          style={{
            paddingBottom:
              Platform.OS === 'ios'
                ? moderateScaleVertical(50)
                : moderateScaleVertical(24),
          }}>
          <ButtonComponent title={'POST'} />
        </View>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
