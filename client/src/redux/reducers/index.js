import { combineReducers } from "redux";
import auth from "./authReducer";
import data from "./dataReducer";
import UI from "./uiReducer";
import basic from "./basicUserReducer"


export default combineReducers({ auth, data, UI, basic });