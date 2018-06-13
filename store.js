/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import {createStore,applyMiddleware} from "redux";
import { middleware } from './source/utils/redux';
import AppReducer from './source/reducers'


const store = createStore(
    AppReducer,
    applyMiddleware(middleware),
);

export default store