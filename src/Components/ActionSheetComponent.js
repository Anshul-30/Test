import React, {useState, useEffect} from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Text, View, Image} from 'react-native';
import TextInputComp from './TextInputComponent';
import ButtonComponent from './ButtonComponent';
import {
  height,
  moderateScale,
  moderateScaleVertical,
} from '../styles/responsiveSize';
import actions from '../redux/actions';
import {
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {cloneDeep} from 'lodash';

function ActionSheetComponent({addComment}) {
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [allComment, setAllComment] = useState([]);
  const [count , setCount] = useState(0)
  const[isLoading,setIsLoading] =useState(false)
  const state = {data, comment};
  

 

  useEffect(() => {
    if (data ||isLoading ) {
      getAllComment();
    }
  }, [data,isLoading]);

  const getAllComment = () => {
    let apiData = `?post_id=${data.value.item.id}&skip=${count}`;
    actions
      .getComment(apiData)
      .then(res => {
        console.log(res, 'get comment response--------------');

        setAllComment(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ActionSheet id="title" onBeforeShow={data => setData(data)}>
      {data ? (
        <View style={{height: '70%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 0.7}}>
              <TextInputComp
                placeholder="Add Comments"
                onChangeText={data => setComment(data)}
                value={comment}
              />
            </View>
            <View style={{flex: 0.3}}>
              <ButtonComponent title="Send" onpress={() => addComment(state)} />
            </View>
          </View>

          {/* <View style={{height:height,paddingBottom:moderateScaleVertical(370)}}>
<ScrollView >

    {allComment.map(i => {
                console.log(i.comment);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      paddingTop: moderateScale(10),
                    }}>
                    <View style={{flex: 0.2, alignItems: 'center'}}>
                      <Image
                        source={{uri: i.user.profile}}
                        style={{height:50,width:50,borderRadius:25}}
                      />
                    </View>
                    <View style={{flex: 0.6, justifyContent: 'center'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text>{i.user.first_name}</Text>
                        <Text>{i.user.last_name}</Text>
                      </View>

                      <TextInputComp
                      value={i.comment}
                        // styling={styles.textStyle}
                      />
                    </View>
                  </View>
                );
              })}
</ScrollView>
    </View> */}
          <View style={{height: height}}>
            <FlatList
              data={allComment}
              onEndReached={()=>{
                console.log('count',count)
                setCount(count+15)
              setIsLoading(true)
              }}
              renderItem={element => {
                // console.log(element)
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 10,
                      }}>
                      <Text>{element.item.comment}</Text>
                      <Text>
                        {'commented by'}
                        {element.item.user.first_name}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      ) : null}
    </ActionSheet>
  );
}

export default ActionSheetComponent;
