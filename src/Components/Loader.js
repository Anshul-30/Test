import React from 'react';
import {Modal, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';
import commonStylesFunc from '../styles/commonStyles';

const LoadingComponent = () => {


  return (
    <View
      style={{
        // ...commonStyles.loader,
        backgroundColor: colors.whiteOpacity5,
        elevation: 5,
      }}>
      <BarIndicator size={25} color={themeColors.primary_color} />
    </View>
  );
};
const Loader = ({isLoading = false, withModal}) => {
  if (withModal) {
    return (
      <Modal transparent visible={isLoading}>
        <LoadingComponent />
      </Modal>
    );
  }
  if (isLoading) {
    return <LoadingComponent />;
  }
  return null;
};

export default React.memo(Loader);
