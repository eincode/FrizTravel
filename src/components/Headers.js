import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';
import { View } from 'react-native-animatable';

import metrics from '../config/metrics';

export default class Headers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            yPosition: new Animated.Value(metrics.DEVICE_HEIGHT),
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount(){
        this.animateHeader()
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        backButtonEnabled: PropTypes.bool
    }

    animateHeader(){
        Animated.stagger(300, [
            Animated.timing(
                this.state.yPosition,
                {
                    toValue: 40,
                    easing: Easing.bezier(0.25,0.1,0.25,1),
                    duration: 750
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

    render() {
        const { title } = this.props;
        return (
            <Animated.View style={{ transform: [{ translateY: this.state.yPosition }], opacity: this.state.opacity, backgroundColor: 'transparent' }}>
                <Text style={styles.title}>{title}</Text>
            </Animated.View>
        )
    }

}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Montserrat',
        color: 'white'
    }
})