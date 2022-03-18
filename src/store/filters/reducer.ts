import { InferValueTypes } from "../../models/common";
import * as actions from './actions';
import { FiltersActionTypes } from "./action-types";

const initialState: TFiltersState = {
    search: "",
    maker: [],
    available: true,
    priceRange: [0, 100]
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TFiltersState = {
    search: string,
    maker: Array<string>,
    available: boolean,
    priceRange: Array<number>
}

export default function filtersReducer(state: TFiltersState = initialState, action: ActionTypes): TFiltersState {
    switch (action.type) {
        case FiltersActionTypes.SET_FILTERS:
            return {
                ...state,
                search: action.search,
                maker: [...action.maker],
                available: action.available,
                priceRange: action.priceRange
            }
        default:
            return state
    }
}
