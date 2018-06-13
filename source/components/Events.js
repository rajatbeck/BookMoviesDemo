/**
 * Created by rajatmareclbeck on 14/06/18.
 */
/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity, Text
} from "react-native";
import { NavigationActions } from "react-navigation";


class Events extends Component {


    static NavigationOptions = () => ({
        title: 'Events',
    });

    constructor(props: Props) {
        super(props);
    }

    _navigate = () => {
       const navigateToNext =  NavigationActions.navigate({
            routeName: "EventDetails",

        });
        this.props.navigation.dispatch(navigateToNext)
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._navigate}>
                    <Text>Press Me</Text>

                </TouchableOpacity>

            </View>
        )
    }

}

export default Events;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});