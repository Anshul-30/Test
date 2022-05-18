import React, {useState} from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Text, View} from 'react-native';
import TextInputComp from './TextInputComponent';
import ButtonComponent from './ButtonComponent';

function ActionSheetComponent() {
  const [data, setData] = useState();
  const [comment, setComment]= useState()
  const state ={ data,comment}
  console.log('data', data);
  return (
    <ActionSheet id="title" onBeforeShow={data => setData(data)}>
      {data ? (
        <View style={{height: '70%'}}>
          <Text>{data.value}</Text>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <View style={{flex:.7}}>
              <TextInputComp placeholder='Add Comments' onChangeText={(data)=>setComment(data)} value={comment}/>
            </View>
            <View style={{flex:.3}}>

            <ButtonComponent title='Send' onPress={()=>addComment(state)} />
            </View>
          </View>
        </View>
      ) : null}
    </ActionSheet>
  );
}

export default ActionSheetComponent;
