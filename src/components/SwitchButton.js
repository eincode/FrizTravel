import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Easing } from 'react-native';

import metrics from '../config/metrics';

export default class SwitchButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            backgroundColor: 'transparent',
            textColor: 'white',
            yPosition: new Animated.Value(metrics.DEVICE_HEIGHT),
            opacity: new Animated.Value(0)
        }
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        active: PropTypes.bool
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            backgroundColor: nextProps.active == true ? 'white' : 'transparent',
            textColor: nextProps.active == false ? 'white' : 'rgb(120,210,247)'
        })
    }

    componentDidMount(){
        this.setState({
            backgroundColor: this.props.active == true ? 'white' : 'transparent',
            textColor: this.props.active == false ? 'white' : 'rgb(120,210,247)'
        })
        this.animate();
    }

    animate(){
        Animated.stagger(300, [
            Animated.timing(
                this.state.yPosition,
                {
                    toValue: 0,
                    easing: Easing.bezier(0.25,0.1,0.25,1),
                    duration: 750,
                    delay: metrics.ANIMATION_SEQUENCE_DELAY
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

    render(){
        const { text, onPress } = this.props;
        return(
            <Animated.View style={{ transform: [{ translateY: this.state.yPosition }], opacity: this.state.opacity }}>
                <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                    <Text style={[styles.text, { color: this.state.textColor }]}>{text}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100
    },

    text: {
        fontFamily: 'Kayak Sans'
    }
})