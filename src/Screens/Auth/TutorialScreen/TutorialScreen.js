import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import images from '../../../constants/imagePath';
import {Text, View, Image,TouchableOpacity} from 'react-native';
import WrapperContainer from '../../../Components/WrapperContainer';
import styles from './styles';
import strings from '../../../constants/lang';

import colors from '../../../styles/colors';
import navigationStrings from '../../../navigation/navigationStrings';
import { moderateScale, moderateScaleVertical } from '../../../styles/responsiveSize';

const slides = [
  {
    key: 1,
    title: strings.TEXT,
    text: strings.TITTLE,
    image: images.intro,
  },
  {
    key: 2,
    title: strings.TEXT,
    text: strings.TITTLE,
    image: images.intro,
  },
  {
    key: 3,
    title: strings.TEXT,
    text: strings.TITTLE,
    image: images.intro,
  },
];

export default function TutorialScreen({navigation}) {
  const _renderItem = ({item}) => {
    return (
        
      <View style={styles.container}>
        <View
          style={{flex: 0.5, justifyContent: 'center'}}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View
          style={{
            flex: 0.5,
            // backgroundColor:'green',
            justifyContent: 'center',
           
            // alignContent:'space-around',
            // paddingTop:moderateScaleVertical(30)
          }}>
         <View >

            <Text style={styles.tittle}>{item.title}</Text>
         </View>
         
          <View style={styles.textview}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View>
        <Text style={styles.next}>Next</Text>
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate(navigationStrings.LOGIN)}>

      <View style={{marginTop:moderateScaleVertical(10)}}>
        <Text style={styles.next}>{strings.GET_Started}</Text>
      </View>
        </TouchableOpacity>
    );
  };
  // const _dotStyle =()=>{
  //   return(
      
  //   )
  // }
    return ( 
    <WrapperContainer>
      <AppIntroSlider
        data={slides}
        renderItem={_renderItem}
        // renderNextButton={_renderNextButton}
        renderDoneButton={_renderDoneButton}
        activeDotStyle={{
          height: moderateScale(4),
          width: moderateScale(42),
          bottom: 4,
          right: moderateScale(90),
          backgroundColor:"red"
        }}
        dotStyle={{
          width: moderateScale(21),
          height: moderateScale(4),
          backgroundColor: colors.white,
          bottom: 4,
          right: moderateScale(90),
        }}
        />
    </WrapperContainer>
  );
}
