/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import {combineReducers} from "redux";
import {nav} from "./NavigationReducer";

const AppReducer = combineReducers({
    nav
});

export default AppReducer;