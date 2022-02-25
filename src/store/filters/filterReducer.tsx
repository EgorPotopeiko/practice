import { Reducer } from 'redux';

const initialState = {
    filterSearch: "",
    filterCategory: "ALL",
    filterSorting: "DATE",
    filterManufacture: [],
};

const filterReducer: Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SEARCH_FILTER":
            return {
                ...state,
                filterSearch: action.search
            }
        case "CATEGORY_FILTER":
            return {
                ...state,
                filterCategory: action.category
            }
        case "SORTING_FILTER":
            return {
                ...state,
                filterSorting: action.sort
            }
        case "MANUFACTURE_FILTER":
            return {
                ...state,
                filterManufacture: {
                    value: action.manufacture
                }
            }
        default:
            return state;
    }
}

export default filterReducer