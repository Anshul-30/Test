import types from '../types';
import store from '../store';
import {apiGet, apiPost, setItem} from '../../utils/utils';
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  FORGOT_PASSWORD,
  IMAGE_UPLOAD,
  LIKES,
  LOGIN,
  POST,
  POST_SEND,
  SIGNUP,
} from '../../config/urls';

const {dispatch} = store;

export const saveUserData = data => {
  setItem('login', data);
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
export const editProfile = (data,header={}) => {
  console.log(data, 'the given data');
  return new Promise((resolve, reject) => {
    apiPost(EDIT_PROFILE, data,header)
      .then(res => {
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

export const forgotPassword = data => {
  return apiPost(FORGOT_PASSWORD, data);
};

// change password

export const changePassword = data => {
  return apiPost(CHANGE_PASSWORD, data);
};
// post send

export const postUpload = (data = {}, header = {}) => {
  console.log('the given data', data);
  return apiPost(POST_SEND, data, header);
};
//image upload

export const imageUpload = (data, header = {}) => {
  return apiPost(IMAGE_UPLOAD, data, header);
};


// post upload 

export const getPost =(query='')=>{
  return apiGet(POST+query)
}

// get Likes 


export const getLikes =(query="")=>{
return apiPost(LIKES+query)
}