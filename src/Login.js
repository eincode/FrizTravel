import React, { Component } from 'react';
import { Text, StyleSheet, Button, TouchableOpacity, Animated, Easing, ScrollView, FlatList } from 'react-native';
import { View } from 'react-native-animatable';
import Display from 'react-native-display';
import Animation from 'lottie-react-native';
import { connect } from 'react-redux';

import metrics from './config/metrics';
import CustomTextInput from './components/CustomTextInput';
import Headers from './components/Headers';
import AccentColor from './components/AccentColor';
import SwitchButton from './components/SwitchButton'
import FlightItem from './components/FlightItem';
import SearchFlight from './fragments/SearchFlight';

const FLIGHTS = [
    {
        key: 1,
        airline: 'Garuda Indonesia',
        time: '9:00 - 9:30 PM',
        duration: '1h 30min',
        price: 'Rp. 754.300'
    },
    {
        key: 2,
        airline: 'Air Asia',
        time: '9:30 - 10:00 PM',
        duration: '1h 30min',
        price: 'Rp. 326.600'
    },
    {
        key: 3,
        airline: 'Sriwijaya Air',
        time: '8:00 - 8:30 AM',
        duration: '1h 30min',
        price: 'Rp. 493.300'
    },
    {
        key: 4,
        airline: 'Citilink',
        time: '10:20 - 10:40 AM',
        duration: '1h 20min',
        price: 'Rp. 515.100'
    },
    {
        key: 5,
        airline: 'Batik Air',
        time: '12:00 - 12:30 PM',
        duration: '1h 30min',
        price: 'Rp. 633.900'
    },
    {
        key: 6,
        airline: 'Lion Air',
        time: '2:00 - 2:30 PM',
        duration: '1h 30min',
        price: 'Rp. 412.300'
    },
    {
        key: 7,
        airline: 'Citilink',
        time: '3:30 - 4:00 PM',
        duration: '1h 30min',
        price: 'Rp. 532.600'
    }
]

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isButtonVisible: false,
            isFormVisible: true,
            isMainMenuContainerVisible: false,
            isMainMenuContentVisible: false,
            isLoadingAnimationVisible: false,
            isSwitchButtonVisible: true,
            isSearchResultVisible: this.props.isSearchResultVisible,
            mainMenuContainerHeight: new Animated.Value(100),
            mainMenuContainerWidth: new Animated.Value(100),
            mainMenuContainerBorderRadius: new Animated.Value(50),
            searchFlightFragmentYPosition: new Animated.Value(0),
            activeButton: 'oneway',
            activeFlightItemIndex: 1
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({ activeFlightItemIndex: nextProps.activeFlightItemIndex })
        if (nextProps.isSearchResultVisible){
            // this.setState({ isSwitchButtonVisible: false });
            // setTimeout(() => {
            //     this.setState({ isSearchResultVisible: nextProps.isSearchResultVisible })
            // }, 300)
            Animated.timing(
                this.state.searchFlightFragmentYPosition,
                {
                    toValue: -100,
                    duration: 500,
                    easing: Easing.bezier(0.25, 1, 0.25, 1)
                }
            ).start(() => this.setState({ isSearchResultVisible: nextProps.isSearchResultVisible }))
        }
    }

    showMainMenu() {
        this.setState({ isFormVisible: false });
        setTimeout(() => {
            this.setState({ isLoadingAnimationVisible: true });
            this.animation.play();
        }, 1000);
        setTimeout(() => {
            this.setState({ isLoadingAnimationVisible: false });
        }, 2000);
        setTimeout(() => {
            this.setState({ isMainMenuContainerVisible: true });
        }, 2500)
    }

    expandMainMenuContainer() {
        Animated.parallel([
            Animated.timing(
                this.state.mainMenuContainerHeight,
                {
                    toValue: metrics.DEVICE_HEIGHT,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    duration: 400
                }
            ),
            Animated.timing(
                this.state.mainMenuContainerWidth,
                {
                    toValue: metrics.DEVICE_WIDTH,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    duration: 400
                }
            ),
            Animated.timing(
                this.state.mainMenuContainerBorderRadius,
                {
                    toValue: 0,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    duration: 400
                }
            )
        ]).start(() => this.setState({ isMainMenuContentVisible: true }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Display enable={this.state.isFormVisible} exit={'fadeOutUp'} style={styles.container}>
                    <View style={[styles.formContainer, { zIndex: 10 }]} animation={'fadeInUp'} duration={500}>
                        <Text style={[styles.greetings, { marginBottom: 20 }]}>SIGN IN</Text>
                        <CustomTextInput label={'Email'} keyboardType={'email-address'} underlineColorAndroid={'transparent'} autoCorrect={false} />
                        <CustomTextInput label={'Password'} secureTextEntry={true} onChangeText={() => this.setState({ isButtonVisible: true })} underlineColorAndroid={'transparent'} autoCorrect={false} />
                        <Text style={{ fontFamily: 'Kayak Sans', alignSelf: 'flex-end', color: 'rgb(93, 102, 245)' }}>Forgot password?</Text>
                        <View style={styles.buttonContainer}>
                            <Display enable={this.state.isButtonVisible} enter={'bounceIn'} enterDuration={1000} keepAlive={true}>
                                <Button title={'SIGN IN'} color={'rgb(93, 102, 245)'} onPress={() => this.showMainMenu()} />
                            </Display>
                        </View>
                    </View>
                    <View style={[styles.formContainer, { justifyContent: 'flex-end', height: 100, alignItems: 'center', width: metrics.DEVICE_WIDTH * 0.7, paddingBottom: 10 }]} animation={'fadeInUp'} duration={500} delay={200}>
                        <TouchableOpacity>
                            <Text style={[styles.greetings, { color: 'grey' }]}>CREATE NEW</Text>
                        </TouchableOpacity>
                    </View>
                </Display>
                <Display enable={this.state.isLoadingAnimationVisible} enter={'fadeIn'} enterDuration={1000} exit={'fadeOut'}>
                    <Animation
                        ref={animation => { this.animation = animation }}
                        style={{ width: 100, height: 100 }}
                        source={require('../assets/animations/loading.json')}
                        loop={true}
                    />
                </Display>
                <Display enable={this.state.isMainMenuContainerVisible} enter={'fadeIn'}>
                    <View animation={'bounce'} iterationCount={3} onAnimationEnd={() => this.expandMainMenuContainer()}>
                        <Animated.View style={[styles.initialMenuContainerAnimation, { height: this.state.mainMenuContainerHeight, width: this.state.mainMenuContainerWidth, borderRadius: this.state.mainMenuContainerBorderRadius }]}>
                            <Display enable={this.state.isMainMenuContentVisible} style={styles.mainMenuContainer}>
                                <AccentColor />
                                
                                    <Display enable={this.state.isSwitchButtonVisible} exit={'fadeOut'} style={{ alignItems: 'center' }} keepAlive={true}>
                                        <Headers title={'FRIZ'} />
                                        <View style={{ marginTop: 60, marginBottom: 20, flexDirection: 'row', width: metrics.DEVICE_WIDTH, alignItems: 'center', justifyContent: 'center' }} animation={'fadeInUp'} delay={200} duration={750}>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <SwitchButton text={'ONE WAY'} active={this.state.activeButton == 'oneway'} onPress={() => this.setState({ activeButton: 'oneway' })} style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <SwitchButton text={'ROUND'} active={this.state.activeButton == 'round'} onPress={() => this.setState({ activeButton: 'round' })} style={{ flex: 1 }} />
                                            </View>
                                        </View>
                                    </Display>
                                    <Animated.View style={{ zIndex: 10, transform: [{ translateY: this.state.searchFlightFragmentYPosition }] }}>
                                        <SearchFlight />
                                    </Animated.View>
                                    <Display enable={this.state.isSearchResultVisible} style={{ marginTop: -130, flex: 1 }}>
                                        <FlatList 
                                            data={FLIGHTS}
                                            renderItem={({item}) => (
                                                <FlightItem index={item.key} airline={item.airline} time={item.time} duration={item.duration} price={item.price} activeItem={this.state.activeFlightItemIndex}/>
                                            )}
                                            style={{ padding: 10}}
                                        />
                                    </Display>
                            </Display>
                        </Animated.View>
                    </View>
                </Display>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(120, 210, 247)',
    },

    greetings: {
        fontFamily: 'Kayak Sans',
        fontSize: 20,
        fontWeight: 'bold',

    },

    formContainer: {
        width: metrics.DEVICE_WIDTH * 0.8,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 3
        },
        marginTop: -50,
    },

    buttonContainer: {
        height: 30,
        marginTop: 5
    },

    mainMenuContainer: {
        flex: 1,
        alignItems: 'center',
    },

    initialMenuContainerAnimation: {
        backgroundColor: 'rgb(247, 239, 243)',
        elevation: 5,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 3
        }
    }
})

const mapStateToProps = (state) => {
    return{
        isSearchResultVisible: state.isSearchResultVisible,
        activeFlightItemIndex: state.flightItemIndex
    }
}

export default connect(mapStateToProps)(Login);