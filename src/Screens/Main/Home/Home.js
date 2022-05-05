import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Card from '../../../Components/Card';
import WrapperContainer from '../../../Components/WrapperContainer';
import Data from '../../../constants/data/post';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveSize';

const Home = ({navigation, route}) => {
  const onPostDetail = (element) => {
    navigation.navigate(navigationStrings.POST_DETAIL, {
      item: element,
    });
  };
  return (
    <WrapperContainer>
      <View>
        <View style={styles.headerStyle}>
          <Image source={imagePath.logo} />
          <Image source={imagePath.loc} />
        </View>
        <View style={{paddingBottom: moderateScaleVertical(140)}}>
          <FlatList
            data={Data}
            // renderItem={_renderCardComponent}
            renderItem={element => {
              return (
                <Card
                  userName={element.item.userName}
                  userImg={element.item.userImg}
                  place={element.item.place}
                  likes={element.item.likes}
                  comments={element.item.comments}
                  caption={element.item.caption}
                  postImage={element.item.postImage}
                  postTime={element.item.postTime}
                  postNav={() => onPostDetail(element?.item)}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.key}
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScaleVertical(24),
    marginHorizontal: moderateScale(24),
  },
});

export default Home;
