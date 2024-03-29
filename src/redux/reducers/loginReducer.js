import { removeItem, setItem } from '../../utils/utils';
import types from '../types';

const initialState = {
  userData:null
};

 const userLogin= (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      const data = action.payload;
      console.log('Data', data);
      
      return {
        ...state,
        userData: data,
      };
    }
    case types.LOGOUT:{
      removeItem('login').then((res)=>{
        console.log('res',res)
      })
      return{
        userData:undefined
      }
    }
    default:
      return state;
  }
};
export default  userLogin