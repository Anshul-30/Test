import { combineReducers } from "redux";
import userLogin from "./loginReducer";
import intro from "./intro";

 const rootReducer = combineReducers({
userLogin,
intro
})

export default rootReducer