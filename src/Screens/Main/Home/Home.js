import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Card from '../../../Components/Card';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveSize';

const Home = ({navigation,route}) => {
  const _renderCardComponent = ({item, index}) => {
    return (
      <Card
        userName={strings.userName}
        userImg={imagePath.Profile}
        place={strings.loc}
        likes={strings.LikeCount}
        comments={strings.CommentCount}
        caption={strings.Caption}
        postImage={imagePath.post1}
        postTime={strings.Time}
      />
    );
  };
  return (
    <WrapperContainer>
      <View style={{marginHorizontal: moderateScale(24)}}>
        <View style={styles.headerStyle}>
          <Image source={imagePath.logo} />
          <Image source={imagePath.loc} />
        </View>
        <View style={{paddingBottom: moderateScaleVertical(140)}}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            renderItem={_renderCardComponent}
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
  },
});

export default Home;
