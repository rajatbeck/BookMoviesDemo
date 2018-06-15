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
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height-(Dimensions.get('window').height*1/4);

class EventsScreen extends Component {

    static navigationOptions = () => ({
        title: 'Events Details',
    });

    constructor(props: Props) {
        super(props);

        this.state = {
            events: this.props.event.filter((eventItem) => eventItem.id === this.props.navigation.state.params.id)

        }


    }

    componentDidMount() {


    }

    render() {

        const customTransition = transitionInfo => {
            const { start, end, boundingbox, dimensions } = transitionInfo;
            const { y, height } = boundingbox;
            const distanceValue = dimensions.height - y + 25; // instead of: - y - 25;
            const progress = transitionInfo.progress.interpolate({
                inputRange: [0, start, end, 1],
                outputRange: [distanceValue, distanceValue, 0, 0],
            });
            return { transform: [{ translateY: progress }] };
        };
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
                    <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={1} onPress={()=> this.props.navigation.goBack()}>
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
                    <Image source={this.state.events[0].img_url} resizeMode={'cover'} style={{zIndex: 1,width,height}}/>
                </Transition>
                <Transition appear={customTransition} disappear="top" delay>
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
                                style={{ alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    }}
                                activeOpacity={1}>
                                <Animated.View
                                    style={{
                                        borderRadius: 4,
                                        backgroundColor: this.state.events[0].status === 'Interested' ? '#545454' : 'green',

                                    }}>
                                    <Text style={{
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        color: Colors.white,
                                        alignItems: 'center',
                                        alignSelf: 'center'
                                    }}>{this.state.events[0].status}</Text>
                                </Animated.View>
                            </TouchableOpacity>}
                        </View>
                        <View
                            style={{
                                borderTopWidth: 1,
                                borderTopColor: '#e2e2e2',
                                marginTop: 8,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems:'center',
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

const EventsDetails = connect(mapStateToProps)(EventsScreen);

export default EventsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});