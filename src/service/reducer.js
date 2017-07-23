import { combineReducers } from 'redux';
import {
    SET_SEARCH_RESULT_VISIBLE,
    setSearchResultVisible,
    SET_FLIGHT_ITEM_COLLAPSIBLE_COLLAPSED_INDEX,
    setFlightItemCollapsibleCollapsedIndex
} from './action';

function isSearchResultVisible(state = false, action) {
    switch(action.type){
        case SET_SEARCH_RESULT_VISIBLE: {
            return action.isSearchResultVisible
        }
        default: {
            return state;
        }
    }
}

function flightItemIndex(state = null, action) {
    switch(action.type){
        case SET_FLIGHT_ITEM_COLLAPSIBLE_COLLAPSED_INDEX: {
            return action.flightItemIndex
        }
        default: {
            return state;
        }
    }
}

const frizState = combineReducers({
    isSearchResultVisible,
    setFlightItemCollapsibleCollapsedIndex
});

export default frizState;