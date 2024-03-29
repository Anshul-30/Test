import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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
import {
  MenuOption,
  MenuOptions,
  Menu,
  MenuTrigger,
} from 'react-native-popup-menu';
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
  addComments
}) {
  const [snapState, setSnapState] = useState(0);
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
        <Menu style={styles.dotStyle}>
          <MenuTrigger>
            <Image source={imagePath.dot} />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              backgroundColor: colors.whiteSmokeColor,
              width: moderateScale(100),
              alignItems: 'center',
              marginTop: moderateScaleVertical(10),
              borderRadius:moderateScale(10)
            }}>
            <MenuOption onSelect={() => alert(`Save`)}>
              <Text style={{fontSize: textScale(14),color:colors.black}}>Save</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`Delete`)}>
              <Text style={{fontSize: textScale(14),color:colors.black}}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      {/* Main Container */}
      <View>
        {!!(
          data?.item?.images?.file &&
          isArray(data?.item?.images?.file) &&
          data?.item?.images?.file.length
        ) ? (
          <>
            <Carousel
              data={data?.item?.images?.file}
              sliderWidth={moderateScale(width - 65)}
              itemWidth={moderateScale(width - 20)}
              scrollEnabled={data?.item?.images?.file.length > 1 ? true : false}
              horizontal
              onSnapToItem={index => setSnapState(index)}
              // hasParallaxImages={true}
              renderItem={i => {
                // console.log(i,'item>>>>>>>>>')
                if (i.item != null && typeof i.item != 'object') {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => postNav(i.item)}>
                      <Image
                        source={{uri: i.item}}
                        style={styles.postImage}
                        // resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </>
        ) : null}

        {/* Pagination dots */}
        <Pagination
          dotsLength={
            !!(
              data?.item?.images?.file &&
              isArray(data?.item?.images?.file) &&
              data?.item?.images?.file.length > 1
            )
              ? data?.item?.images?.file.length
              : 0
          }
          activeDotIndex={snapState}
          containerStyle={{paddingVertical: 0, marginTop: 0}}
          dotColor={'red'}
          dotStyle={{width: 12, height: 12, borderRadius: 12 / 2}}
          inactiveDotStyle={{width: 20, height: 20, borderRadius: 20 / 2}}
          inactiveDotColor={'black'}
          inactiveDotOpacity={0.4}
          activeOpacity={0.8}
          dotContainerStyle={{marginHorizontal: 2}}
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
            <TouchableOpacity style={{flex: 0.4}} onPress={addComments}>
              <Text style={{color: colors.white, fontSize: textScale(13)}}>
                {strings.COMMENTS} {data.item.comment_count}
              </Text>
            </TouchableOpacity>
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
    paddingVertical: moderateScaleVertical(10),
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
    width: moderateScale(width - 20),
    height: moderateScale(width - 40),
    marginVertical: moderateScaleVertical(10),
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
