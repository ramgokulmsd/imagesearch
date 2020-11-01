import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

//combiner of the redux

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
});
