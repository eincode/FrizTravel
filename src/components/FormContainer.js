import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet }  from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class FormContainer extends Component {

    static propTypes = {
        label: PropTypes.string,
        icon: PropTypes.string,
        style: PropTypes.object
    }

    render(){
        const { label, icon, style, ...otherProps } = this.props;
        return(
            <View style={[styles.container, style]} {...otherProps}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.formContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name={icon} size={30} color={'rgb(120, 210, 247)'}/>
                    </View>
                    <View style={styles.children}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10
    },
    
    formContainer: {
        height: 40,
        flexDirection: 'row',
    },

    iconContainer: {
        height: 40,
        width: 50,
    },

    label: {
        fontFamily: 'Kayak Sans',
        color: 'grey',
        marginLeft: 50
    },

    children: {
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'grey',
        flex: 1
    }
})