import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { FiltersActionTypes } from './action-types';

const initialState: TFiltersState = {
    search: "",
    price: [0, 5000],
    category: "all"
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TFiltersState = {
    search: string,
    price: Array<number>,
    category: string
}

export default function filtersReducer(state: TFiltersState = initialState, action: ActionTypes): TFiltersState {
    switch (action.type) {
        case FiltersActionTypes.SET_FILTERS:
            return {
                ...state,
                search: action.search,
                price: action.price,
                category: action.category
            }
        case FiltersActionTypes.REMOVE_ALL_FILTERS:
            return {
                ...state,
                search: "",
                price: [0, 5000],
                category: "all"
            }
        default:
            return state
    }
}
