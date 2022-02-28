import { Reducer } from 'redux';

const initialState = {
    filterSearch: "",
    filterCategory: "all",
    filterSorting: "DATE",
    filterMaker: [],
    filterAvailable: true,
    filterPrice: [0, 100]
};

const filterReducer: Reducer = (state = initialState, action) => {
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
        case "MAKER_FILTER":
            return {
                ...state,
                filterMaker: action.maker
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