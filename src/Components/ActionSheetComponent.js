import React, {useState, useEffect} from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Text, View} from 'react-native';
import TextInputComp from './TextInputComponent';
import ButtonComponent from './ButtonComponent';
import {height, moderateScale} from '../styles/responsiveSize';
import actions from '../redux/actions';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {cloneDeep} from 'lodash';

function ActionSheetComponent({addComment}) {
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [allComment, setAllComment] = useState([]);

  const state = {data, comment};
  console.log('state-------------', state);
  console.log('data', data);

  useEffect(() => {
    
    //   getAllComment();

  }, []);

  const getAllComment = () => {
    let apiData = `?post_id=${data.value.item.id}`;
    actions
      .getComment(apiData)
      .then(res => {
        console.log(res, 'get comment response--------------');
        
        setAllComment(res.data);
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


    <View style={{height:height}}>

          <FlatList
            data={allComment}
            
            
            renderItem={element => {
                // console.log(element)
              return (
                <View><View style={{flexDirection:'row' ,justifyContent:'space-between',margin:10}}>
                  <Text>{element.item.comment}</Text>
                  <Text>{'commented by'}{element.item.user.first_name}</Text>
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
