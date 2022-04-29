import {setItem} from '../../utils/utils';
import types from '../types';

const initialState = {
  appintrodata: true,
};

export default Intro = (state = initialState, action) => {
  switch (action.type) {
    case types.INTRO: {
      const data = action.payload;
      setItem('intro', data);
      return {
        ...state,
        appintrodata: data,
      };
    }
    default:
      return state;
  }
};
