import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { FiltersAdminActionTypes } from './action-types';

const initialState: TFiltersAdminState = {
    searchArticle: '',
    searchStatus: true,
    chooseStatus: "оплачен",
    searchUser: "",
    searchNumber: ""
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TFiltersAdminState = {
    searchArticle: string,
    searchStatus: boolean,
    chooseStatus: string,
    searchUser: string,
    searchNumber: string
}

export default function filtersAdminReducer(state: TFiltersAdminState = initialState, action: ActionTypes): TFiltersAdminState {
    switch (action.type) {
        case FiltersAdminActionTypes.SET_FILTERS_ADMIN:
            return {
                ...state,
                searchArticle: action.searchArticle,
                searchStatus: action.searchStatus,
                chooseStatus: action.chooseStatus,
                searchUser: action.searchUser,
                searchNumber: action.searchNumber
            }
        case FiltersAdminActionTypes.REMOVE_ALL_FILTERS_ADMIN:
            return {
                ...state,
                searchArticle: '',
                searchStatus: true,
                chooseStatus: "оплачен",
                searchUser: "",
                searchNumber: ""
            }
        default:
            return state
    }
}
