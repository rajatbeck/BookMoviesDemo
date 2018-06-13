/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import {
    createReactNavigationReduxMiddleware,
    createNavigationPropConstructor,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);
const navigationPropConstructor = createNavigationPropConstructor('root');

export { middleware, navigationPropConstructor };