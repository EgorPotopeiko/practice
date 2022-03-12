import { RootStateOrAny } from 'react-redux';
import { Reducer } from 'redux';

const initialState = {
    filterSearch: "",
    filterCategory: "all",
    filterSorting: "DATE",
    filterMaker: [],
    filterAvailable: true,
    filterPrice: [0, 100],
    listCategories: JSON.parse(localStorage.getItem("categories")!) || ["all", "cats", "dogs", "fishes", "birds", "rodents", "other"]
};

const removeCategory = (state: RootStateOrAny, category: string) => {
    const categories = state.listCategories;
    return categories.filter((item: string) => item !== category)
}

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
        case "REMOVE_FILTERS":
            return {
                ...state,
                filterSearch: "",
                filterCategory: "all",
                filterSorting: "DATE",
                filterMaker: [],
                filterAvailable: true,
                filterPrice: [0, 100]
            }
        case "ADDED_CATEGORY":
            return {
                ...state,
                listCategories: [...state.listCategories, action.category]
            }
        case "REMOVED_CATEGORY":
            return {
                ...state,
                listCategories: removeCategory(state, action.category)
            }
        default:
            return state;
    }
}

export default filterReducer