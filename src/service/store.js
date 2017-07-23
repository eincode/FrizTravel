import { createStore } from 'redux';
import frizState from './reducer';
let store = createStore(frizState);

export default store;