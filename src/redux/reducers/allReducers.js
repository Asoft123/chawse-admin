import { combineReducers } from "redux";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";

const allReducers = combineReducers({
  userData: userReducer,
  UI: uiReducer,
});

export default allReducers;
