import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';

export default function Card({
  userName,
  userImg,
  place,
  postImage,
  caption,
  postTime,
  comments,
  likes,
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
            <Text style={{color: colors.white}}>{userName}</Text>
            <Text style={{color: colors.textMediumGray}}>{place}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            marginHorizontal: moderateScale(8),
            flex: 0.15,
          }}>
          <Image source={imagePath.dot} />
        </TouchableOpacity>
      </View>
      {/* Main Container */}

      <Image
        source={postImage}
        style={styles.postImage}
        resizeMode={'contain'}
      />
      <View>
        <Text style={{color: colors.white}}>{caption}</Text>
        <Text
          style={{
            color: colors.time,
            marginVertical: moderateScaleVertical(8),
          }}>
          {postTime}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: moderateScaleVertical(8),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: colors.white}}>
              {strings.COMMENTS} {comments}
            </Text>
            <Text
              style={{
                color: colors.white,
                marginHorizontal: moderateScale(24),
              }}>
              {strings.LIKES} {likes}
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={imagePath.forwardImage} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: moderateScale(width-68),
    alignSelf:'center',
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
    width: moderateScale(width-88),
    height: moderateScale(width-40),
    marginVertical: moderateScaleVertical(16),
    alignSelf: 'center',
  },
  shareIcon: {
    width: moderateScale(width / 15),
    resizeMode: 'contain',
    marginRight: moderateScale(10),
    height: moderateScale(height / 15),
  },
});
