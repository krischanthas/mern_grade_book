import { combineReducers } from "redux";
import auth from "./authReducer";
import data from "./dataReducer";
import UI from "./uiReducer";


export default combineReducers({ auth, data, UI });