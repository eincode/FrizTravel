import React, { Component, PropTypes } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default class CustomTextInput extends Component {

    state = {
        borderColor: 'grey'
    }

    static propTypes = {
        label: PropTypes.string,
        keyboardType: PropTypes.string
    }

    render(){
        const { label, keyboardType, ...otherProps } = this.props
        return(
            <View style={styles.container}>
                <Text style={styles.text}>{label}</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} keyboardType={keyboardType} autoCapitalize={'none'} {...otherProps}/>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },

    inputContainer: {
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 7,
        borderColor: 'grey'
    },

    text: {
        fontFamily: 'Kayak Sans',
        color: 'grey',
        marginLeft: 1,
    },

    textInput: {
        height: 40,
        fontFamily: 'Kayak Sans' 
    }
})