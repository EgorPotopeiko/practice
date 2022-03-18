import { InferValueTypes } from "../../models/common";
import * as actions from './actions';
import { PaginationActionTypes } from "./action-types";

const initialState: TPaginationState = {
    page: 1,
    pageSize: 6
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TPaginationState = {
    page: number,
    pageSize: number
}

export default function paginationReducer(state: TPaginationState = initialState, action: ActionTypes): TPaginationState {
    switch (action.type) {
        case PaginationActionTypes.SET_PAGE:
            return {
                ...state,
                page: action.page,
                pageSize: action.pageSize
            }
        default:
            return state
    }
}
