import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DotIndicator} from 'react-native-indicators';
import Card from '../../../Components/Card';
import Loader from '../../../Components/Loader';
import WrapperContainer from '../../../Components/WrapperContainer';
import {LIKES} from '../../../config/urls';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';

import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveSize';
import {apiPost} from '../../../utils/utils';

const Home = ({navigation, route}) => {




  

  // -----------------------States----------------------------

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [likes, setLikes] = useState(0);

console.log('updated post',post)

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
          if(refresh){
            setPost(res?.data)
          }else{
            setPost([...post, ...res?.data]);

          }
        })
        .catch(err => {
          console.log(err, 'error');
        });
    }
  }, [isLoading,refresh]);

  // useEffect(() => {
  //   let newArray = post.map((i, inx) => {
  //     console.log(i?.user?.profile);
  //     return i?.user?.profile;
  //   });
  //   console.log(newArray, 'user image');
  // });

  // --------------------------Refresh------------------------

  const onRefresh = () => {
    // setPost([]);
    setCount(0);
    setRefresh(true);
  };

  //---------------------------Likes Count---------------------

  const getLikes = element => {
    let id = element.item.id;
    console.log('id', id);
    if (element.item.like_status == 0) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }

    let apiData = `?post_id=${id}&status=${likes}`;

    actions
      .getLikes(apiData)
      .then(res => {
        // console.log('likes>>>>>>>>>>>>>>>', res);
        // alert(res?.message)
        // setPost(res?.)
      })
      .catch(err => {
        alert(err?.message);
      });
  };

  const onPostDetail = (element,image) => {
    navigation.navigate(navigationStrings.POST_DETAIL, {
      item: element,
      image :image
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

            renderItem={(element, index) => {
              // console.log('element>>>>>>>>>>>>>>>', element);
              return (
                <Card
                  data={element}
                  postNav={(image) => onPostDetail(element,image)}
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
