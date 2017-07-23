export const SET_SEARCH_RESULT_VISIBLE = 'SET_SEARCH_RESULT_VISIBLE';
export const SET_FLIGHT_ITEM_COLLAPSIBLE_COLLAPSED_INDEX = 'SET_FLIGHT_ITEM_COLLAPSIBLE_COLLAPSED_INDEX';

export function setSearchResultVisible(isSearchResultVisible){
    return {
        type: SET_SEARCH_RESULT_VISIBLE,
        isSearchResultVisible
    }
}

export function setFlightItemCollapsibleCollapsedIndex(flightItemIndex){
    return {
        type: SET_FLIGHT_ITEM_COLLAPSIBLE_COLLAPSED_INDEX,
        flightItemIndex
    }
}