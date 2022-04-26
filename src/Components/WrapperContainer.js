import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import colors from '../styles/colors';

// import {moderateScale, moderateScaleVertical} from '../styles/responsiveSize';

// import strings from '../constants/lang';

const WrapperContainer = ({
  children,
  bgColor = colors.cust,
  statusBarColor = colors.cust,
  barStyle = 'light-content',
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: statusBarColor,
      }}>
      <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} />
      <View style={{backgroundColor: bgColor, flex: 1}}>{children}</View>
    </SafeAreaView>
  );
};

export default React.memo(WrapperContainer);
