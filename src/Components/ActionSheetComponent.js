import React, {useState, useEffect} from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Text, View, Image, TouchableOpacity} from 'react-native';
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
import imagePath from '../constants/imagePath';

function ActionSheetComponent({
  addComment,
  countData = 0,
  allCommentData = [],
}) {
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [allComment, setAllComment] = useState(allCommentData);
  const [count, setCount] = useState(countData);
  const [isLoading, setIsLoading] = useState(false);
  const state = {data, comment};

  // console.log('count ----------', count);
  // console.log('Comment------------', allComment);

  useEffect(() => {
    if (data || isLoading) {
      getAllComment();
    }
  }, [data, isLoading]);

  const getAllComment = () => {
    console.log(data.value.item.id, 'udgfvuhiu');
    console.log('count-----------', count);
    let apiData = `?post_id=${data.value.item.id}&skip=${count}`;
    console.log(apiData, 'apiData');
    actions
      .getComment(apiData)
      .then(res => {
        console.log(res, 'get comment response--------------');
        setAllComment([...allComment, ...res?.data]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const updateComments = status => {
    console.log(status, 'status>>>>>NEW');
    SheetManager.hide('title');
    setAllComment([]);
    setCount(0);
    if (status) {
      addComment(state);
    }
  };

  return (
    <ActionSheet
      closeOnPressBack={false}
      closeOnTouchBackdrop={false}
      // onClose={() => updateComments(false)}
      id="title"
      onBeforeShow={data => setData(data)}>
      <TouchableOpacity onPress={() => updateComments(false)}>
        <Image source={imagePath.cancel} style={{alignSelf: 'center'}} />
      </TouchableOpacity>
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
              <ButtonComponent
                title="Send"
                onpress={() => updateComments(true)}
              />
            </View>
          </View>

          <View
            style={{height: height, paddingBottom: moderateScaleVertical(350)}}>
            <FlatList
              contentContainerStyle={{paddingVertical: 50}}
              data={allComment}
              extraData={allComment}
              onEndReached={() => {
                setCount(count + 15);
                console.log('count', count);
                setIsLoading(true);
              }}
              onEndReachedThreshold={0.1}
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
                      <Text>{element.index}</Text>
                      <Text>{element.item.comment}</Text>
                      <Text>
                        {'commented by '}
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
