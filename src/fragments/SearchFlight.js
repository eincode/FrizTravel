import React, { Component } from 'react';
import { Text, StyleSheet, Animated, Easing, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Display from 'react-native-display';
import Animation from 'lottie-react-native';

import store from '../service/store';
import { setSearchResultVisible } from '../service/action';
import FormContainer from '../components/FormContainer';
import metrics from '../config/metrics';

const ANIMATION_INITIAL_DELAY = 500;
const ANIMATION_DELAY = 50;

export default class SearchFlight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            yPosition: new Animated.Value(metrics.DEVICE_HEIGHT),
            opacity: new Animated.Value(0),
            height: new Animated.Value(500),
            isSearchingAnimationPlaying: false,
            isSearchingIconVisible: true,
            isFormVisible: true,
            isSummaryVisible: false,
        }
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        Animated.stagger(300, [
            Animated.timing(
                this.state.yPosition,
                {
                    toValue: 0,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    duration: 750,
                    delay: metrics.ANIMATION_SEQUENCE_DELAY * 2
                }
            ),
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 1,
                    easing: Easing.linear,
                    duration: 450
                }
            )

        ]).start()
    }

    animateFragmentHeight(){
        Animated.timing(
            this.state.height,
            {
                toValue: 100,
                easing: Easing.bezier(0.25, 1, 0.25, 1),
                duration: 750
            }
        ).start()
    }

    handleSearchButtonPress() {
        if (this.state.isSearchingIconVisible) {
            this.setState({ isSearchingIconVisible: false });
            setTimeout(() => {
                this.setState({ isSearchingAnimationPlaying: true });
                this.loadingAnimation.play();
            }, 300);
            setTimeout(() => {
                store.dispatch(setSearchResultVisible(true));
                this.setState({ isFormVisible: false });
                this.animateFragmentHeight()
            }, 2000);
            setTimeout(() => {
                this.setState({ isSummaryVisible: true })
            }, 2500)
        }
    }

    render() {
        return (
            <Animated.View style={[styles.container, { transform: [{ translateY: this.state.yPosition }], opacity: this.state.opacity, height: this.state.height }]}>
                <View animation={'fadeInUp'} delay={ANIMATION_INITIAL_DELAY} style={{ marginBottom: 20 }} duration={750}>
                    <Text style={styles.title}>SEARCH FLIGHT</Text>
                </View>
                <Display enable={this.state.isSummaryVisible} enter={'fadeIn'} enterDuration={2000}>
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryItemContainer}>
                            <View style={styles.summaryItemIconContainer}>
                                <MaterialIcon name={'airplane-takeoff'} size={30} color={'rgb(120, 210, 247)'} />
                            </View>
                            <View style={styles.summaryItemTextContainer}>
                                <Text style={{ fontFamily: 'Kayak Sans' }}>Makassar (UPG)</Text>
                            </View>
                        </View>
                        <View style={styles.summaryItemContainer}>
                            <View style={styles.summaryItemIconContainer}>
                                <MaterialIcon name={'airplane-landing'} size={30} color={'rgb(120, 210, 247)'} />
                            </View>
                            <View style={styles.summaryItemTextContainer}>
                                <Text style={{ fontFamily: 'Kayak Sans' }}>Surabaya (SUB)</Text>
                            </View>
                        </View>
                    </View>
                </Display>
                <Display enable={this.state.isFormVisible} exit={'fadeOut'} style={{ alignItems: 'center' }}>
                    <View animation={'fadeInUp'} delay={ANIMATION_INITIAL_DELAY + ANIMATION_DELAY} duration={750}>
                        <FormContainer label={'From'} icon={'airplane-takeoff'} style={{ width: metrics.DEVICE_WIDTH * 0.9 }}>
                            <TextInput style={styles.textInput} autoCorrect={false} value={'Makassar (UPG)'} />
                        </FormContainer>
                    </View>
                    <View animation={'fadeInUp'} delay={ANIMATION_INITIAL_DELAY + ANIMATION_DELAY * 2} duration={750}>
                        <FormContainer label={'To'} icon={'airplane-landing'} style={{ width: metrics.DEVICE_WIDTH * 0.9 }}>
                            <TextInput style={styles.textInput} autoCorrect={false} value={'Surabaya (SUB)'} />
                        </FormContainer>
                    </View>
                    <View animation={'fadeInUp'} delay={ANIMATION_INITIAL_DELAY + ANIMATION_DELAY * 3} duration={750}>
                        <FormContainer label={'Passengers'} icon={'account'} style={{ width: metrics.DEVICE_WIDTH * 0.9 }}>
                            <TextInput style={styles.textInput} autoCorrect={false} keyboardType={'numeric'} value={'1'} />
                        </FormContainer>
                    </View>
                    <View animation={'fadeInUp'} delay={ANIMATION_INITIAL_DELAY + ANIMATION_DELAY * 4} duration={750}>
                        <FormContainer label={'Departure'} icon={'calendar'} style={{ width: metrics.DEVICE_WIDTH * 0.9 }}>
                            <TextInput style={styles.textInput} autoCorrect={false} value={'29 June 2017'} />
                        </FormContainer>
                    </View>
                    <View animation={'fadeInUp'} delay={ANIMATION_INITIAL_DELAY + ANIMATION_DELAY * 5} style={{ marginTop: 30 }} duration={750}>
                        <TouchableOpacity style={styles.searchButtonContainer} onPress={() => this.handleSearchButtonPress()}>
                            <Display enable={this.state.isSearchingIconVisible} enter={'zoomIn'} exit={'zoomOut'}>
                                <Icon name={'search'} size={20} color={'white'} />
                            </Display>
                            <Display enable={this.state.isSearchingAnimationPlaying} enter={'zoomIn'}>
                                <Animation
                                    ref={animation => { this.loadingAnimation = animation }}
                                    style={{ width: 50, height: 50 }}
                                    source={require('../../assets/animations/loading.json')}
                                    loop={true}
                                />
                            </Display>
                        </TouchableOpacity>
                    </View>
                </Display>
            </Animated.View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: metrics.DEVICE_WIDTH * 0.95,
        backgroundColor: 'white',
        borderRadius: 10,
        minHeight: 50,
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        zIndex: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 3
        }
    },

    title: {
        fontFamily: 'Montserrat'
    },

    textInput: {
        fontFamily: 'Kayak Sans'
    },

    searchButtonContainer: {
        backgroundColor: 'rgb(120, 210, 247)',
        height: 50,
        width: 50,
        borderRadius: 50,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 3
        }
    },

    summaryContainer: {
        width: metrics.DEVICE_WIDTH * 0.85,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    summaryItemContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    summaryItemIconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    summaryItemTextContainer: {
        flex: 5,
        justifyContent: 'center',
        marginLeft: 10
    }
})