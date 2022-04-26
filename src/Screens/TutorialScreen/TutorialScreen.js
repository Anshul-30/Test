import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import images from '../../constants/imagePath';
import {Text, View, Image} from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import styles from './styles';
import strings from '../../constants/lang';
import {height, moderateScaleVertical, textScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import navigationStrings from '../../navigation/navigationStrings';
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
            justifyContent: 'center',
            paddingTop:moderateScaleVertical(40)
          }}>
          <View style={styles.main}>
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

      <View >
        <Text style={styles.next}>{strings.GET_Started}</Text>
      </View>
        </TouchableOpacity>
    );
  };
  const _dotStyle =()=>{
      return(
          <>
        
          </>
      )
  }
  return ( 
    <WrapperContainer>
      <AppIntroSlider
        data={slides}
        renderItem={_renderItem}
        renderNextButton={_renderNextButton}
        renderDoneButton={_renderDoneButton}
        // dotStyle={_dotStyle}
      />
    </WrapperContainer>
  );
}
