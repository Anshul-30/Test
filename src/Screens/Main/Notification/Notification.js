import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../Components/WrapperContainer';
import {FlatList} from 'react-native-gesture-handler';
import Data from '../../../constants/data/post';
import imagePath from '../../../constants/imagePath';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';
import HeaderComponent from '../../../Components/HeaderComponent';
import Divider from 'react-native-elements/dist/divider/Divider';
import strings from '../../../constants/lang';
export default function Notification({navigation, route}) {
  const _renderItem = ({element, index}) => {
    return (
      <>
        <View
          style={{
            // alignItems: 'center',
            flexDirection: 'row',
            marginTop: moderateScaleVertical(10),
            marginHorizontal: moderateScale(15),
            padding: moderateScale(15),
          }}>
          <View style={{flex: 0.2}}>
            <Image
              source={imagePath.Profile}
              style={{
                height: moderateScale(width / 8),
                width: moderateScale(width / 8),
                borderRadius: moderateScale(width / 16),
              }}
            />
          </View>

          <View style={{flex: 0.8, marginHorizontal: moderateScale(5)}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: colors.button, fontSize: textScale(13)}}>
                {strings.USERNAME}
                <Text style={{color: colors.white}}>{'added a new post.'}</Text>
              </Text>
            </View>
            <Text style={{color: '#B5B0B0'}}>{'20 min ago'}</Text>
          </View>
        </View>
        <Divider style={{marginLeft: moderateScale(100)}} />
      </>
    );
  };
  return (
    <WrapperContainer>
      <HeaderComponent text={true} headerTxt={'Notification'} />
      <FlatList data={[1, 2, 3, 4]} renderItem={_renderItem} />
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
