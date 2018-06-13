/**
 * Created by rajatmareclbeck on 14/06/18.
 */

import { AppNavigator } from '../navigators/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Events')
);


export function nav(state = initialState, action) {
    let  nextState = AppNavigator.router.getStateForAction(action, state);
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}



