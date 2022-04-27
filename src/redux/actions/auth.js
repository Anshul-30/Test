import types from "../types";
import store from "../store";

const {dispatch} = store


export const Login = (data) => {
    dispatch({
        type:types.LOGIN,
        payload:data
    })
};
