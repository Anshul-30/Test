import React, { useEffect, useState } from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Card from '../../../Components/Card';
import WrapperContainer from '../../../Components/WrapperContainer';
import Data from '../../../constants/data/post';
import imagePath from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveSize';

const Home = ({navigation, route}) => {
  const onPostDetail = element => {
    console.log('Element -----------',element)
    navigation.navigate(navigationStrings.POST_DETAIL, {
      item: element,
    });
  };
const [post,setPost] = useState()
  useEffect(()=>{
    actions.postUpload().then((res)=>
    {console.log(res?.data,'post upload'),
    setPost(res?.data)}
    )
  },[])

  return (
    <WrapperContainer>
      <View>
        <View style={styles.headerStyle}>
          <Image source={imagePath.logo} />
          <Image source={imagePath.loc} />
        </View>
        <View style={{paddingBottom: moderateScaleVertical(140)}}>
          <FlatList
            data={post}
            // renderItem={_renderCardComponent}
            renderItem={element => {
             console.log(element,'element')
              return (
                <Card
                  userName={element.item.user.first_name}
                  userImg={element.item.user.profile}
                  place={element.item.location_name}
                  likes={element.item.like_count}
                  comments={element.item.comment_count}
                  caption={element.item.caption}
                  postImage={element.item.images.file}
                  postTime={element.item.time_ago}
                  postNav={() => onPostDetail(element)}
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
