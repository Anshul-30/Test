import {cloneDeep} from 'lodash';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Card from '../../../Components/Card';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveSize';

const Home = ({navigation, route}) => {
  // -----------------------States----------------------------

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [likes, setLikes] = useState(1);

  // console.log('updated post',post)
  // console.log('likes',likes)
  useEffect(() => {
    if (isLoading || refresh) {
      let apiData = `?skip=${count}`;
      console.log('apidata', apiData);
      // setIsLoading(true);
      actions
        .getPost(apiData)
        .then(res => {
          console.log(res, 'post upload');

          setIsLoading(false);
          setRefresh(false);
          if (refresh) {
            setPost(res?.data);
          } else {
            setPost([...post, ...res?.data]);
          }
        })
        .catch(err => {
          console.log(err, 'error');
        });
    }
  }, [isLoading, refresh, likes]);

  // --------------------------Refresh------------------------

  const onRefresh = () => {
    setCount(0);
    setRefresh(true);
  };

  //---------------------------Likes Count---------------------

  const getLikes = element => {
    let id = element.item.id;
    console.log('previous status', element.item.like_status);
    let updateLikeStatus = Number(element.item.like_status) ? 0 : 1;
    console.log('like status', updateLikeStatus);
    let apiData = `?post_id=${id}&status=${updateLikeStatus}`;

    actions
      .getLikes(apiData)
      .then(res => {
        console.log('getLikes response', res);

        let newArray = cloneDeep(post);
        newArray = newArray.map((i, inx) => {
          if (i?.id == id) {
            i.like_count = updateLikeStatus
              ? Number(i.like_count) + 1
              : Number(i.like_count) - 1;
            i.like_status = updateLikeStatus;
            console.log(i, 'after update');
            return i;
          } else {
            return i;
          }
        });
        console.log(newArray, 'newArray');
        setPost(newArray);
      })
      .catch(err => {
        alert(err?.message);
      });
  };

  // ------------------navigation----------------------

  const onPostDetail = (element, image) => {
    navigation.navigate(navigationStrings.POST_DETAIL, {
      item: element,
      image: image,
    });
  };

  return (
    <WrapperContainer isLoading={isLoading} withModal={isLoading}>
      <View>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => setCount(0)}>
            <Image source={imagePath.logo} />
          </TouchableOpacity>
          <Image source={imagePath.loc} />
        </View>

        <View style={{paddingBottom: moderateScaleVertical(140)}}>
          <FlatList
            data={post}
            // renderItem={_renderCardComponent}
            extraData={post}
            renderItem={(element, index) => {
              console.log('element>>>>>>>>>>>>>>>', element);
              return (
                <Card
                  data={element}
                  postNav={image => onPostDetail(element, image)}
                  getLikes={() => getLikes(element)}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              console.log('count>>>>>>>', count);
              setCount(count + 8);
              setIsLoading(true);
            }}
            onEndReachedThreshold={0.1}
            refreshing={refresh}
            onRefresh={onRefresh}
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
