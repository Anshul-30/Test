import React, {useState,useEffect} from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {Text, View} from 'react-native';
import TextInputComp from './TextInputComponent';
import ButtonComponent from './ButtonComponent';
import { height, moderateScale } from '../styles/responsiveSize';
import actions from '../redux/actions';
import { FlatList } from 'react-native-gesture-handler';

function ActionSheetComponent({addComment}) {
  const [data, setData] = useState();
  const [comment, setComment]= useState()
  const [count,setCount]= useState(0)
  const state ={ data,comment}
  console.log('state-------------',state)
  console.log('data', data);

useEffect(() => {
    if(data){
  getAllComment()}

 
}, [data])

const getAllComment =()=>{
    let apiData =  `?post_id=${data.value.item.id}&skip=${count}`
    actions.getComment(apiData).then((res)=>{
        console.log(res,"get comment response--------------")
    }).catch((err)=>{
        console.log(err)
    })
}

  return (
    <ActionSheet id="title" onBeforeShow={data => setData(data)}>
      {data ? (
        <View style={{height: '70%'}}>
            
          <Text>{data.value.item.id}</Text>
           
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <View style={{flex:.7}}>
              <TextInputComp placeholder='Add Comments' onChangeText={(data)=>setComment(data)} value={comment}/>
            </View>
            <View style={{flex:.3}}>

            <ButtonComponent title='Send' onpress={()=>addComment(state)} />
            </View>
          </View>
            {data.value.item.commets? 
            <FlatList
            data={data.value.item.commets}
            onEndReached={()=>{
                console.log(count)
                setCount(count+3)
                
            }}
            onEndReachedThreshold={.9}
            renderItem={(element)=>{
                console.log('element',element)
                return(
                    <Text>{element.item.comment}</Text>
                )
            }}
            
            />
            
            // data.value.item.commets.map((i,inx)=>{
            //     console.log(i)
            //     return(

            // <><View>
            //     <Text>{i.comment}</Text>
            //     </View></>
            //     )
            // })
            :null}
        </View>
      ) : null}
    </ActionSheet>
  );
}

export default ActionSheetComponent;
