import { combineReducers } from "redux";
import { authReducer } from "./reducer/authreducer";
import { Themereducer } from "./reducer/Themereducer";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: Themereducer
});

export default rootReducer;
