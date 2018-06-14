/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import {combineReducers} from "redux";
import {nav} from "./NavigationReducer";
import EventReducer from './eventReducer'

const AppReducer = combineReducers({
    nav,
    EventReducer,
});

export default AppReducer;