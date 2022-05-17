import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import colors from '../styles/colors';
import {
  height,
  itemWidth,
  moderateScale,
  moderateScaleVertical,
  sliderWidth,
  textScale,
  width,
} from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import strings from '../constants/lang';
import navigationStrings from '../navigation/navigationStrings';
import {apiPost} from '../utils/utils';
import {isArray, isEmpty} from 'lodash';
import Carousel, {Pagination} from 'react-native-snap-carousel';
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
  data = {},
  getLikes,
}) {

  const [snapState, setSnapState] = useState(0)
  // console.log(data,"dataaaa");
  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={[styles.header, {flexWrap: 'wrap'}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.25}}>
            <Image
              source={{uri: data.item.user.profile}}
              style={styles.userImage}
            />
          </View>
          <View style={{flex: 0.6}}>
            <Text style={{color: colors.white, fontSize: textScale(14)}}>
              {data.item.user.first_name}
            </Text>
            <Text
              style={{color: colors.textMediumGray, fontSize: textScale(13)}}>
              {data.item.location_name}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.dotStyle}>
          <Image source={imagePath.dot} />
        </TouchableOpacity>
      </View>
      {/* Main Container */}
      <View>
        {data?.item?.images?.file &&
        isArray(data?.item?.images?.file) &&
        data?.item?.images?.file.length ? (
          <>
            <Carousel
              data={data?.item?.images?.file}
              sliderWidth={moderateScale(width - 80)}
              itemWidth={moderateScale(width - 80)}
              scrollEnabled={true}
              horizontal
              // hasParallaxImages={true}
              renderItem={i => {
                return (
                  <TouchableOpacity onPress={postNav}>
                    <Image
                      source={{uri: i.item}}
                      style={styles.postImage}
                      // resizeMode={'c'}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          
          </>
        ) : null}

        {/* Pagination dots */}
        <Pagination
          dotsLength={
            data?.item?.images?.file &&
            isArray(data?.item?.images?.file) &&
            data?.item?.images?.file.length>1
              ? data?.item?.images?.file
              : []
          }
          activeDotIndex={snapState}
          containerStyle={{backgroundColor: 'transparent'}}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            // marginHorizontal: 10,
            backgroundColor: 'red',
          }}
          
          inactiveDotOpacity={.4}
          inactiveDotScale={0.6}
          
        />
      </View>
      <View>
        <Text style={{color: colors.white, fontSize: textScale(12)}}>
          {data.item.description}
        </Text>
        <Text
          style={{
            color: colors.time,
            marginVertical: moderateScaleVertical(8),
            fontSize: textScale(13),
          }}>
          {data.item.time_ago}
        </Text>
        <View style={styles.bottomView}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.4}}>
              <Text style={{color: colors.white, fontSize: textScale(13)}}>
                {strings.COMMENTS} {data.item.comment_count}
              </Text>
            </View>
            <TouchableOpacity style={{flex: 0.5}} onPress={getLikes}>
              <Text
                style={{
                  color: colors.white,
                  marginHorizontal: moderateScale(24),
                  fontSize: textScale(13),
                }}>
                {strings.LIKES} {data.item.like_count}
              </Text>
            </TouchableOpacity>
            <View style={{flex: 0.1}}>
              <TouchableOpacity>
                <Image
                  source={imagePath.forwardImage}
                  style={styles.shareIcon}
                />
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
    // flexWrap:'wrap'
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
