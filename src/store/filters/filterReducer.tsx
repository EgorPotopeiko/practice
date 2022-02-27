import { Reducer } from 'redux';

const initialState = {
    filterSearch: "",
    filterCategory: "ALL",
    filterSorting: "DATE",
    filterManufacture: [],
    filterAvailable: true,
    filterPrice: [0, 20]
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
                filterManufacture: action.manufacture
            }
        case "AVAILABLE_FILTER":
            return {
                ...state,
                filterAvailable: action.available
            }
        case "PRICE_FILTER":
            return {
                ...state,
                filterPrice: action.priceRange
            }
        default:
            return state;
    }
}

export default filterReducer