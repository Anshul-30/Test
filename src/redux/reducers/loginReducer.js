import { setItem } from '../../utils/utils';
import types from '../types';

const initialState = {
  userData: {},
};

export const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      const data = action.payload;
      console.log('Data', data);
      setItem('login',data)
      return {
        userData: data,
      };
    }
    default:
      return state;
  }
};
