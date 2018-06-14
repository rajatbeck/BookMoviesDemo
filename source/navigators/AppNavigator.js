/**
 * Created by rajatmareclbeck on 14/06/18.
 */

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStackNavigator} from 'react-navigation';
import {initializeListeners} from 'react-navigation-redux-helpers';

import {navigationPropConstructor} from '../utils/redux';
import Events from "../components/Events";
import EventDetails from "../components/EventDetails";
import {FluidNavigator} from "../react_navigation_fluid";
import createFluidNavigator from "../react_navigation_fluid/src/createFluidNavigator";



export const AppNavigator = createFluidNavigator({
    Events: {
        screen: Events
    },
    EventDetails: {
        screen: EventDetails,

    },

},{
    mode: 'card',
    navigationOptions: {
        gesturesEnabled: true,

    },
});


class AppWithNavigationState extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };

    componentDidMount() {
        initializeListeners("root", this.props.nav);
    }

    render() {
        const {dispatch, nav} = this.props;
        this._navigation = navigationPropConstructor(
            dispatch,
            nav,
            AppNavigator.router,
            () => this._navigation
        );
        return <AppNavigator navigation={this._navigation}/>;
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);