/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from "react-native";

class EventsDetails extends Component {

    static NavigationOptions = () => ({
        title: 'Events Details',
    });

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }

}

export default EventsDetails

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});