import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import Card from '../../../Components/Card';
import Loader from '../../../Components/Loader';
import WrapperContainer from '../../../Components/WrapperContainer';
import imagePath from '../../../constants/imagePath';
import navigationStrings from '../../../navigation/navigationStrings';
import actions from '../../../redux/actions';

import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveSize';

const Home = ({navigation, route}) => {
  const onPostDetail = element => {
    navigation.navigate(navigationStrings.POST_DETAIL, {
      item: element,
    });
  };
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const [count, setCount] = useState(0)


  useEffect(() => {
    let apiData = `?skip=${count}`;
    setIsLoading(true)
    actions
      .getPost(apiData)
      .then(res => {
        console.log(res, 'post upload'),
         setIsLoading(false);
        setPost(res?.data);
      })
      .catch(err => {
        console.log(err, 'error');
      });
  }, [count]);

  // const onLoad=()=>{
  //   let currentPageInfo = post.lenghth
  //   console.log('current page info',currentPageInfo)
  // }

  return (
    <WrapperContainer isLoading={isLoading} withModal={isLoading}>
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
              return (
                <Card data={element} postNav={() => onPostDetail(element)} />
              );
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.key}
            onEndReached={()=>{
             

               console.log('count>>>>>>>',count)
               setCount(count+1)
             
             
            }}
            // onRefresh={}
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
