import types from '../types';
import store from '../store';
import {apiPost} from '../../utils/utils';
import {EDIT_PROFILE, LOGIN, SIGNUP} from '../../config/urls';

const {dispatch} = store;

export const saveUserData = data => {
  console.log('userdata----', data);
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export const logout = () => {
  dispatch({
    type: types.LOGOUT,
  });
};

export function signUp(data) {
  console.log('fher', data);
  return new Promise((resolve, reject) => {
    apiPost(SIGNUP, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export const login = (data, header = {}) => {
  console.log(data, 'the given data');
  return new Promise((resolve, reject) => {
    apiPost(LOGIN, data)
      .then(res => {
        saveUserData(res.data);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};


///Edit profile
export const editProfile = (data, header = {}) => {
  console.log(data, 'the given data');
  return new Promise((resolve, reject) => {
    apiPost(EDIT_PROFILE, data)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const intro = data => {
  dispatch({
    type: types.INTRO,
    payload: data,
  });
};
