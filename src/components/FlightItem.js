import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

import store from '../service/store';
import { setFlightItemCollapsibleCollapsedIndex } from '../service/action';
import metrics from '../config/metrics';

export default class FlightItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            isDetailCollapsed: true
        }
    }

    static propTypes = {
        index: PropTypes.number,
        airline: PropTypes.string,
        time: PropTypes.string,
        duration: PropTypes.string,
        price: PropTypes.string,
        activeItem: PropTypes.number
    }

    componentDidMount(){
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeItem == this.props.index){
            this.setState({ isDetailCollapsed: false })
        } else {
            this.setState({ isDetailCollapsed: true })
        }
    }

    getAirlineLogo(){
        switch(this.props.airline){
            case 'Batik Air' : {
                return require('../../assets/images/batik_logo.png');
            }
            case 'Garuda Indonesia': {
                return require('../../assets/images/garuda_logo.png');
            }
            case 'Sriwijaya Air' : {
                return require('../../assets/images/sriwijaya_logo.png');
            }
            case 'Lion Air' : {
                return require('../../assets/images/lion_logo.png');
            }
            case 'Air Asia': {
                return require('../../assets/images/airasia_logo.png');
            }
            case 'Citilink' : {
                return require('../../assets/images/citilink_logo.png');
            }
        }
    }

    render(){
        const { airline, time, duration, price, index } = this.props;
        return(
            <View>
                <TouchableOpacity onPress={() => this.setState({ isDetailCollapsed: !this.state.isDetailCollapsed })} style={{ zIndex: 10 }}>
                    <View style={styles.container} animation={'fadeInUp'} delay={index*100} duration={500}>
                        <View style={styles.airlineLogoContainer}>
                            <Image source={this.getAirlineLogo()} style={styles.airlineLogo} resizeMode={'contain'}/>
                            <Text style={styles.airlineLogoLabel}>{airline}</Text>
                        </View>
                        <View style={styles.flightSummaryContainer}>
                            <Text style={{ fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: 15 }}>{time}</Text>
                            <Text style={{ fontFamily: 'Kayak Sans', fontSize: 12, color: 'grey' }}>Economy</Text>
                            <Text style={{ fontFamily: 'Kayak Sans', fontSize: 12, color: 'grey' }}>{duration}</Text>
                        </View>
                        <View style={styles.flightCostContainer}>
                            <Text style={{ fontFamily: 'Kayak Sans', fontSize: 10, color: 'grey',  }}>UPG-SUB</Text>
                            <View style={styles.priceContainer}>
                                <Text style={{ fontFamily: 'Montserrat', color: 'white', fontSize: 12 }}>{price}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={this.state.isDetailCollapsed}>
                    <View style={styles.flightDetailContainer}>
                        <View style={styles.flightDetailRow}>
                            <View style={styles.flightDetailColumn}>
                                <Text style={{ fontFamily: 'Kayak Sans', color: 'grey', fontSize: 12 }}>From</Text>
                                <Text style={{ fontFamily: 'Montserrat', fontSize: 14 }}>MAKASSAR (UPG)</Text>
                            </View>
                            <View style={styles.flightDetailColumn}>
                                <Text style={{ fontFamily: 'Kayak Sans', color: 'grey', fontSize: 12 }}>To</Text>
                                <Text style={{ fontFamily: 'Montserrat', fontSize: 14 }}>SURABAYA (SUB)</Text>
                            </View>
                        </View>
                        <View style={styles.flightDetailRow}>
                            <View style={styles.flightDetailColumn}>
                                <Text style={{ fontFamily: 'Kayak Sans', color: 'grey', fontSize: 12 }}>Passengger Name</Text>
                                <Text style={{ fontFamily: 'Montserrat', fontSize: 14 }}>Saito Shuka</Text>
                            </View>
                            <View style={styles.flightDetailColumn}>
                                <Text style={{ fontFamily: 'Kayak Sans', color: 'grey', fontSize: 12 }}>Details</Text>
                                <Text style={{ fontFamily: 'Montserrat', fontSize: 12 }}>1 Adult</Text>
                            </View>
                        </View>
                        <View style={styles.flightDetailRow}>
                            <View style={styles.flightDetailColumn}>
                                <Text style={{ fontFamily: 'Kayak Sans', color: 'grey', fontSize: 12 }}>Departure</Text>
                                <Text style={{ fontFamily: 'Montserrat', fontSize: 14 }}>Thu, 29 Jun</Text>
                            </View>
                            <View style={styles.flightDetailColumn} />
                        </View>
                        <TouchableOpacity style={styles.bookButton}>
                            <Text style={{ fontFamily: 'Kayak Sans', color: 'white', fontWeight: 'bold'}}>BOOK</Text>
                        </TouchableOpacity>
                    </View>
                </Collapsible>
            </View>
        )
    }

}

const styles = StyleSheet.create({ 
    container: {
        width: metrics.DEVICE_WIDTH*0.95,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        flexDirection: 'row',
        elevation: 5,
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 3
        },
        marginTop: 20,
    },

    airlineLogoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    airlineLogoLabel: {
        fontFamily: 'Kayak Sans',
        fontSize: 10,
        color: 'grey'
    },

    airlineLogo: {
        width: 50,
        height: 50,
        marginBottom: 5
    },

    flightSummaryContainer: {
        marginLeft: 10,
        flex: 2,
        justifyContent: 'space-between'
    },

    flightCostContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    priceContainer: {
        backgroundColor: 'rgb(93, 102, 245)',
        padding: 5,
        alignItems: 'center',
        borderRadius: 30
    },

    flightDetailContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 20,
        borderRadius: 5,
        marginTop: -10,
        marginBottom: 10,
        width: metrics.DEVICE_WIDTH*0.9,
        alignSelf: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 3
        },
    },

    flightDetailRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    flightDetailColumn: {
        flex: 1,
        paddingLeft: 10
    },

    bookButton: {
        backgroundColor: 'rgb(93, 102, 245)',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 10,
        width: metrics.DEVICE_WIDTH*0.3
    }
})