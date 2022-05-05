import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Divider from 'react-native-elements/dist/divider/Divider';
import { FlatList } from 'react-native-gesture-handler';
import HeaderComponent from '../../../Components/HeaderComponent';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width
} from '../../../styles/responsiveSize';



export default function Notification({navigation, route}) {


// ------------------------This is a render section------------------

  const _renderItem = ({element, index}) => {
    return (
      <>
        <View
          style={styles.mainConatiner}>
          <View style={{flex: 0.2}}>
            <Image
              source={imagePath.profile}
              style={styles.imgae}
            />
          </View>

          <View style={styles.content}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: colors.button, fontSize: textScale(13)}}>
                {strings.USERNAME}
                <Text style={{color: colors.white}}>{strings.ADDED_NEW_POST}</Text>
              </Text>
            </View>
            <Text style={{color: '#B5B0B0'}}>{strings.POST_TIME}</Text>
          </View>
        </View>
        <Divider style={{marginLeft: moderateScale(100)}} />
      </>
    );
  };



  return (
    <WrapperContainer>
      <HeaderComponent text={true} headerTxt={strings.NOTIFICATION} />
      <FlatList data={[1, 2, 3, 4]} renderItem={_renderItem} bounces={false}/>
    </WrapperContainer>
  );
}




const styles = StyleSheet.create({
mainConatiner:{
  // alignItems: 'center',
  flexDirection: 'row',
  marginTop: moderateScaleVertical(10),
  marginHorizontal: moderateScale(15),
  padding: moderateScale(15),
},
imgae:{
  height: moderateScale(width / 8),
  width: moderateScale(width / 8),
  borderRadius: moderateScale(width / 16),
},
content:{flex: 0.8, marginHorizontal: moderateScale(5)}
});
