import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import navigationStrings from '../navigation/navigationStrings';

export default function Card({
  userName,
  userImg,
  place,
  postImage,
  caption,
  postTime,
  comments,
  likes,
  postNav = '',
  navigation,
}) {
  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={[styles.header, {flexWrap: 'wrap'}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.25}}>
            <Image source={userImg} style={styles.userImage} />
          </View>
          <View style={{flex: 0.6}}>
            <Text style={{color: colors.white,fontSize:textScale(14)}}>{userName}</Text>
            <Text style={{color: colors.textMediumGray, fontSize:textScale(13)}}>{place}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.dotStyle}>
          <Image source={imagePath.dot} />
        </TouchableOpacity>
      </View>
      {/* Main Container */}

      <TouchableOpacity onPress={postNav}>
        <Image
          source={postImage}
          style={styles.postImage}
          // resizeMode={'contain'}
        />
      </TouchableOpacity>
      <View>
        <Text style={{color: colors.white,fontSize:textScale(12)}}>{caption}</Text>
        <Text
          style={{
            color: colors.time,
            marginVertical: moderateScaleVertical(8),
            fontSize:textScale(13)
          }}>
          {postTime}
        </Text>
        <View style={styles.bottomView}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex:.4}}>

            <Text style={{color: colors.white,fontSize:textScale(13)}}>
              {strings.COMMENTS} {comments}
            </Text>
            </View>
            <View style={{flex:.5}}>

            <Text
              style={{
                color: colors.white,
                marginHorizontal: moderateScale(24),
                fontSize:textScale(13)
              }}>
              {strings.LIKES} {likes}
            </Text>
            </View>
            <View style={{flex:.1}}>

          <TouchableOpacity>
            <Image source={imagePath.forwardImage} style={styles.shareIcon} />
          </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: moderateScale(width - 48),
    alignSelf: 'center',
    backgroundColor: colors.bgColor,
    marginBottom: moderateScaleVertical(28),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScaleVertical(16),
    borderRadius: moderateScale(8),
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    width: moderateScale(width / 8),
    height: moderateScale(width / 8),
    borderRadius: moderateScale(width / 16),
    // resizeMode: 'contain',
    marginHorizontal: moderateScale(8),
  },
  postImage: {
    width: moderateScale(width - 88),
    height: moderateScale(width - 40),
    marginVertical: moderateScaleVertical(16),
    alignSelf: 'center',
  },
  shareIcon: {
    width: moderateScale(width / 20),
    resizeMode: 'contain',
    marginRight: moderateScale(10),
    height: moderateScale(width / 20),
  },
  dotStyle: {
    justifyContent: 'flex-end',
    marginHorizontal: moderateScale(8),
    flex: 0.15,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScaleVertical(8),
  },
});
