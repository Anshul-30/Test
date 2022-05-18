import React, {useEffect} from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import Routes from './src/navigation/Routes';
import actions from './src/redux/actions';
import store from './src/redux/store';
import {getItem} from './src/utils/utils';
import { MenuProvider } from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    getItem('intro').then(res => {
      console.log(res, 'getItem>>>res');
      if (res != null) {
        actions.intro(res);
      }
    });

    getItem('login').then(res => {
      if (!!res) {
        console.log('res', res);
        actions.saveUserData(res);
      }
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <MenuProvider>

        <Routes />
        </MenuProvider>
      </Provider>
      <FlashMessage position="top" />
    </>
  );
}
