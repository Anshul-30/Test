import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import WrapperContainer from '../../../Components/WrapperContainer';
import images from '../../../constants/imagePath';
import strings from '../../../constants/lang';
import actions from '../../../redux/actions';
import colors from '../../../styles/colors';
import {
  moderateScale,
  moderateScaleVertical
} from '../../../styles/responsiveSize';
import styles from './styles';


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

export default function TutorialScreen({navigation,route}) {
  const _renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.mainView}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View
          style={styles.mainView
           }>
          <View>
            <Text style={styles.tittle}>{item.title}</Text>
          </View>

          <View style={styles.textView}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => actions.intro(false)}>
        <View style={{marginTop: moderateScaleVertical(10)}}>
          <Text style={styles.next}>{strings.GET_STARTED}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <WrapperContainer>
      <AppIntroSlider
        data={slides}
        renderItem={_renderItem}
        renderDoneButton={_renderDoneButton}
        activeDotStyle={{
          height: moderateScale(4),
          width: moderateScale(42),
          bottom: 4,
          right: moderateScale(90),
          backgroundColor: 'red',
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
