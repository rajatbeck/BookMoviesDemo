/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";
import Transition from "react-navigation-fluid-transitions/src/TransitionView";
import Images from "../assets/images";
import {connect} from "react-redux";
const width = Dimensions.get('window').width;

class EventsScreen extends Component {

    static navigationOptions = () => ({
        title: 'Events Details',
    });

    constructor(props: Props) {
        super(props);


    }

    componentDidMount(){



    }

    render() {
        return (
            <View style={styles.container}>
                <Transition shared={`image${this.props.navigation.state.params.id}`}>
                    <Image source={Images.ic_first} style={{width}}/>
                </Transition>
            </View>
        )
    }

}


const mapStateToProps = state => ({
    event: state.EventReducer.event
});

const EventsDetails = connect(mapStateToProps)(EventsScreen);

export default EventsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});