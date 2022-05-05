import types from '../types';
import store from '../store';
import {apiPost, setItem} from '../../utils/utils';
import {CHANGE_PASSWORD, EDIT_PROFILE, FORGOT_PASSWORD, LOGIN, SIGNUP} from '../../config/urls';

const {dispatch} = store;

export const saveUserData = data => {
  setItem('login',data)
  console.log('userdata----', data);
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

//logout

export const logout = () => {
  dispatch({
    type: types.LOGOUT,
  });
};

// signup
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

// login
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
export const editProfile = (data) => {
  console.log(data, 'the given data');
  return new Promise((resolve, reject) => {
    apiPost(EDIT_PROFILE, data)
      .then((res) => {
        saveUserData(res.data);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

//app intro slider

export const intro = data => {
  dispatch({
    type: types.INTRO,
    payload: data,
  });
};

// forgot password

export const forgotPassword =(data)=>{
return apiPost(FORGOT_PASSWORD,data)
}


// change password


export const changePassword=(data)=>{
  return apiPost(CHANGE_PASSWORD,data)
}
