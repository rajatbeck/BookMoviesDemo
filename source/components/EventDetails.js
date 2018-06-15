/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    Animated,
    Easing, TouchableOpacity,
} from "react-native";
import Transition from "react-navigation-fluid-transitions/src/TransitionView";
import Images from "../assets/images";
import {connect} from "react-redux";
import Colors from "../assets/Colors";
import {modifyEvent} from "../actions/EventsActions";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height - (Dimensions.get('window').height * 1 / 4);

class EventsScreen extends Component {

    static navigationOptions = () => ({
        title: 'Events Details',
    });

    constructor(props: Props) {
        super(props);
        this.state = {
            events: this.props.event.filter((eventItem) => eventItem.id === this.props.navigation.state.params.id)

        }
        this.buttonAnimation = new Animated.Value(this.state.events[0].status === 'Going' ? 1 : 0);


    }

    componentDidMount() {


    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({events: nextProps.event.filter((eventItem) => eventItem.id === this.props.navigation.state.params.id)})
    }


    _animate() {
        Animated.timing(
            this.buttonAnimation,
            {
                toValue: 1 - this.buttonAnimation._value,
                duration: 200,
                easing: Easing.linear
            }
        ).start(() => {
        })
    }

    onGoingPressed = () => {
        if (this.state.events[0].status !== 'Going') {
            this._animate();
            let events = this.props.event;
            events = events.map((item) => {
                    if (item.id === this.props.navigation.state.params.id) {
                        item.status = 'Going';
                        return item;
                    } else {
                        return item;
                    }

                }
            );
            this.props.modifyEvent(events);
        }


    };

    render() {
        myCustomTransitionFunction = (transitionInfo) => {
            const {progress, start, end, dimensions} = transitionInfo;
            const scaleInterpolation = progress.interpolate({
                inputRange: [0, start, end, 1],
                outputRange: [88, 80, 1, 1],
            });
            return {transform: [{scale: scaleInterpolation}]};
        };

        let rotate = this.buttonAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });

        let color = this.buttonAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['#545454', 'green']
        });

        let textRotation = this.buttonAnimation.interpolate({
           inputRange:[0,1],
            outputRange:['0deg','180deg'],
        });

        // const {modifyEvent} = this.props;

        return (
            <View style={styles.container}>


                <View style={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    marginTop: 20,
                    height: 50,
                    zIndex: 2,
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={1}
                                      onPress={() => this.props.navigation.goBack()}>
                        <Image
                            source={Images.ic_back_arrow}
                            style={{
                                width: 24,
                                height: 24,
                                marginLeft: 8,
                                alignItems: 'center',
                                alignSelf: 'center',
                                tintColor: Colors.white
                            }}
                        />
                        <Transition appear="horizontal">
                            <Text style={{
                                fontWeight: 'normal',
                                flexDirection: 'row',
                                fontSize: 16,
                                paddingHorizontal: 8,
                                color: Colors.white,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>Event Details</Text>
                        </Transition>

                    </TouchableOpacity>


                </View>

                <Transition shared={`image${this.props.navigation.state.params.id}`}>
                    <Image source={this.state.events[0].img_url} resizeMode={'cover'}
                           style={{zIndex: 1, width, height}}/>
                </Transition>
                <Transition appear="bottom" disappear="top" delay={true}>
                    <View style={{backgroundColor: Colors.white, flex: 1}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{
                                    color: Colors.black,
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    paddingTop: 8,
                                    paddingBottom: 4,
                                }}>{this.state.events[0].event_name}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                }}>
                                    <Image source={Images.ic_location}
                                           style={{width: 16, height: 16, tintColor: Colors.textSubTitle}}/>
                                    <Text style={{
                                        color: Colors.black,
                                        paddingHorizontal: 4,
                                        fontWeight: 'bold',
                                        paddingBottom: 2,
                                        fontSize: 12,
                                    }}>{this.state.events[0].event_location}</Text>
                                </View>
                                <Text style={{
                                    color: Colors.black,
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    paddingTop: 4,
                                    paddingBottom: 8
                                }}>{this.state.events[0].event_date}</Text>
                            </View>
                            {this.state.events[0].status !== 'none' &&
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',


                                }}

                                activeOpacity={1}
                                onPress={this.onGoingPressed}
                            >
                                { <Animated.View
                                    style={[{
                                        borderRadius: 4,
                                        height: 40,
                                        width: 100,

                                        backgroundColor: this.state.events[0].status === 'Interested' ? '#545454' : 'green',
                                    }, {transform: [{rotateY: rotate}], backgroundColor: color}]}>
                                    <Animated.Text style={[{
                                        position: 'absolute',
                                        top: 10,
                                        bottom: 10,
                                        left:0,
                                        right:0,
                                        alignItems: 'center',
                                        justifyContent:'center',
                                        alignSelf: 'center',
                                        textAlign:'center',
                                        color: Colors.white,
                                    },{transform:[{rotateY:textRotation}]}]
                                    }>{this.state.events[0].status}</Animated.Text>
                                </Animated.View>}
                            </TouchableOpacity>}
                        </View>
                        <View
                            style={{
                                borderTopWidth: 1,
                                borderTopColor: '#e2e2e2',
                                marginTop: 8,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: 16

                            }}>
                            <Text style={{color: Colors.black, paddingTop: 8}}>Add to calendar</Text>
                            <View style={{flexDirection: 'row', paddingTop: 8}}>
                                <Text style={{
                                    color: 'green',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    paddingRight: 4
                                }}>Know More</Text>
                                <Image source={Images.ic_forward_arrow} style={{
                                    width: 20,
                                    height: 20,
                                    paddingLeft: 4,
                                    alignSelf: 'center',
                                    justifyContent: 'center'
                                }}/>
                            </View>
                        </View>

                    </View>
                </Transition>
            </View>
        )
    }

}


const mapStateToProps = state => ({
    event: state.EventReducer.event
});

const mapDispatchToProps = {
    modifyEvent
};

const EventsDetails = connect(mapStateToProps, mapDispatchToProps)(EventsScreen);

export default EventsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});