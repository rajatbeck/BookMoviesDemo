/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    Dimensions
} from "react-native";
import {NavigationActions} from "react-navigation";
import Images from "../assets/images";
import Colors from "../assets/Colors";
import {connect} from "react-redux";
import Carousel from "react-native-snap-carousel";
import {stackAnimatedStyles, stackScrollInterpolator} from "../utils/animations";
import Transition from "../react_navigation_fluid/src/TransitionView";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const itemWidth = width - 100;
const maxHeight = height - 16 - 8 - 50 - 20 - 50 - 50;


// class LogoTitle extends React.Component {
//     render() {
//         return (
//             <View style={{backgroundColor: Colors.white, flexDirection: 'row', marginTop: 20, height: 50}}>
//                 <Image
//                     source={Images.ic_back_arrow}
//                     style={{width: 24, height: 24, marginLeft: 8}}
//                 />
//                 <Transition appear="vertical">
//                 <Text style={{
//                     fontWeight: 'normal',
//                     flexDirection: 'row',
//                     fontSize: 16,
//                     paddingHorizontal: 8,
//                     alignSelf: 'center',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}>Events</Text>
//                 </Transition>
//             </View>
//         );
//     }
// }

class EventsScreen extends Component {


    static navigationOptions = () => ({
        title: '',
        headerStyle: {
            backgroundColor: Colors.white,
            borderBottomColor: Colors.white,
        },
        headerTintColor: Colors.black,
        headerTitleStyle: {
            fontWeight: 'normal',
            flexDirection: 'row',

        },
        // headerLeft: <LogoTitle/>,
        // headerRight: (<Image source={Images.ic_search_icon} style={{width: 24, height: 24, marginRight: 8}}/>)


    });


    constructor(props: Props) {
        super(props);
    }


    componentDidMount() {

    }

    _navigate = (item) => {
        const navigateToNext = NavigationActions.navigate({
            routeName: "EventDetails",
            params: {id: item.id}
        });
        this.props.navigation.dispatch(navigateToNext)
    };

    render() {
        return (
            <View style={styles.container}>


                <View style={{
                    backgroundColor: Colors.white,
                    flexDirection: 'row',
                    marginTop: 20,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={Images.ic_back_arrow}
                            style={{
                                width: 24,
                                height: 24,
                                marginLeft: 8,
                                alignItems: 'center',
                                alignSelf: 'center'
                            }}
                        />
                        <Transition appear="horizontal">
                            <Text style={{
                                fontWeight: 'normal',
                                flexDirection: 'row',
                                fontSize: 16,
                                paddingHorizontal: 8,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>Events</Text>
                        </Transition>

                    </View>

                    <Image source={Images.ic_search_icon}
                           style={{
                               width: 24,
                               height: 24,
                               marginRight: 8,
                               alignItems: 'center',
                               alignSelf: 'center'
                           }}/>
                </View>

                <Carousel
                    ref={ref => this.headerCarousel = ref}
                    containerCustomStyle={{maxHeight: 60, marginBottom: 16, marginTop: 8}}
                    vertical={true}
                    data={this.props.event}
                    itemHeight={100}
                    sliderHeight={100}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    scrollEnabled={false}
                    activeAnimationType={'decay'}
                    renderItem={(item) => {
                        return (
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 16
                                }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',

                                    }}>{item.item.event_name}</Text>
                                    <Text style={{
                                        color: Colors.textSubTitle,
                                        fontWeight: 'bold',
                                        fontSize: 12
                                    }}>{item.item.event_date}</Text>
                                </View>
                                <View style={{flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12}}>
                                    <Image source={Images.ic_location}
                                           style={{width: 16, height: 16, tintColor: Colors.textSubTitle}}/>
                                    <Text style={{
                                        color: Colors.textSubTitle,
                                        paddingHorizontal: 4,
                                        fontWeight: 'bold',
                                        paddingBottom: 2,
                                        fontSize: 12,
                                    }}>{item.item.event_location}
                                    </Text>
                                </View>


                            </View>
                        )
                    }}
                />
                <Carousel
                    containerCustomStyle={{maxHeight}}
                    // scrollInterpolator={stackScrollInterpolator}
                    // slideInterpolatedStyle={stackAnimatedStyles}
                    useScrollView={true}
                    layout={'stack'}
                    onSnapToItem={(slideIndex) => {
                        this.headerCarousel.snapToItem(slideIndex, true)
                    }}
                    data={this.props.event}
                    itemWidth={width - 20}
                    sliderWidth={width}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    width: width - 100,
                                    shadowOpacity: 0.75,
                                    shadowRadius: 8,
                                    borderRadius: 8,
                                    shadowColor: 'transparent',
                                    shadowOffset: {height: 0, width: 0},

                                }}
                                activeOpacity={1}
                                onPress={() => this._navigate(item)}
                            >
                                <Transition shared={`image${item.id}`}>
                                    <Image
                                        style={{borderRadius: 12, width: width - 50}}
                                        resizeMode={'stretch'}
                                        source={item.img_url}/>
                                </Transition>

                                {item.status !== 'none' && <View style={{
                                    position: 'absolute',
                                    backgroundColor: item.status === 'Interested' ? Colors.white : 'green',
                                    borderRadius: 4,
                                    left: 8,
                                    bottom: 24,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{
                                        color: item.status === 'Interested' ? Colors.black : Colors.white,
                                        paddingHorizontal: 12,
                                        paddingVertical: 4,
                                        fontSize: 14
                                    }}>{item.status}</Text>
                                </View>}
                            </TouchableOpacity>
                        )
                    }}/>


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    paddingHorizontal: 16,
                }}>
                    <Image source={Images.ic_menu} style={{width: 20, height: 20, tintColor: Colors.textSubTitle}}
                           resizeMode={'contain'}/>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={Images.ic_add}
                               style={{width: 20, height: 20, tintColor: Colors.textSubTitle}}/>
                        <Text style={{
                            color: Colors.textSubTitle,
                            paddingHorizontal: 4,
                            fontWeight: 'bold',
                            paddingBottom: 2,
                            fontSize: 14,
                        }}>Create Event</Text>


                    </View>


                </View>


            </View>
        )
    }

}

const mapStateToProps = state => ({
    event: state.EventReducer.event
});

const Events = connect(mapStateToProps)(EventsScreen);

export default Events;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        flexDirection: 'column'

    }

});