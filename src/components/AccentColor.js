import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';

import metrics from '../config/metrics';

export default class AccentColor extends Component {

    render(){
        return(
            <View style={styles.accentColor} animation={'fadeInUp'} duration={500}/>
        )
    }

}

const styles = StyleSheet.create({
    accentColor: {
        backgroundColor: 'rgb(120, 210, 247)',
        position: 'absolute',
        top: 0,
        width: metrics.DEVICE_WIDTH,
        height: 170
    }
})