import { InferValueTypes } from "../../models/common";
import * as actions from './actions';
import { FiltersActionTypes } from "./action-types";

const initialState: TFiltersState = {
    search: "",
    priceRange: [10, 100000],
    sort: "date",
    category: "all",
    listCategories: ["all", "mobile", "electron", "pc", "home", "sport"],
    listAdmin: ["товары", "категории", "заказы"]
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TFiltersState = {
    search: string,
    priceRange: Array<number>,
    sort: string,
    category: string,
    listCategories: Array<string>,
    listAdmin: Array<string>
}

export default function filtersReducer(state: TFiltersState = initialState, action: ActionTypes): TFiltersState {
    switch (action.type) {
        case FiltersActionTypes.SET_FILTERS:
            return {
                ...state,
                search: action.search,
                priceRange: action.priceRange,
                sort: action.sort,
                category: action.category
            }
        case FiltersActionTypes.REMOVE_ALL_FILTERS:
            return {
                ...state,
                search: "",
                priceRange: [10, 100000],
                sort: "date",
                category: "all",
            }
        default:
            return state
    }
}
