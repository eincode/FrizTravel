import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './service/store';

import Login from './Login';

const Friz = StackNavigator({
    login: { screen: Login }
}, 
    {
        headerMode: 'none'
    }
)

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <Friz />
            </Provider>
        )
    }
}

export default App;