import { RootStateOrAny } from 'react-redux';
import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { FiltersActionTypes } from './action-types';

const initialState: TFiltersState = {
    search: "",
    priceRange: [10, 100000],
    category: "all",
    listCategories: JSON.parse(localStorage.getItem("categories")!) || ["all", "mobile", "electron", "pc", "home", "sport"]
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TFiltersState = {
    search: string,
    priceRange: Array<number>,
    category: string,
    listCategories: Array<string>
}

const deleteCategory = (state: RootStateOrAny, category: string) => {
    const categories = state.listCategories;
    return categories.filter((item: string) => item !== category)
}

export default function filtersReducer(state: TFiltersState = initialState, action: ActionTypes): TFiltersState {
    switch (action.type) {
        case FiltersActionTypes.SET_FILTERS:
            return {
                ...state,
                search: action.search,
                priceRange: action.priceRange,
                category: action.category
            }
        case FiltersActionTypes.REMOVE_ALL_FILTERS:
            return {
                ...state,
                search: "",
                priceRange: [10, 100000],
                category: "all"
            }
        case FiltersActionTypes.ADDED_CATEGORY:
            return {
                ...state,
                listCategories: [...state.listCategories, action.category]
            }
        case FiltersActionTypes.DELETED_CATEGORY:
            return {
                ...state,
                listCategories: deleteCategory(state, action.category)
            }
        default:
            return state
    }
}
