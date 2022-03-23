import { InferValueTypes } from '../../models/common';
import * as actions from './actions'
import { ErrorActionState, StartActionState, SuccessActionState } from '../helpers';
import { ProductsActionTypes } from './action-types';

const initialState: TProductsState = {
    products: [],
    error: null,
    isLoading: false,
    page: 1,
    pageSize: 6,
    data: null
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TProductsState = {
    products: []
    isLoading: boolean
    error: any
    page: number
    pageSize: number
    data: null
}

export default function productsReducer(state: TProductsState = initialState, action: ActionTypes): TProductsState {
    switch (action.type) {
        case ProductsActionTypes.LOAD_PRODUCTS_START:
            return StartActionState(state)
        case ProductsActionTypes.LOAD_PRODUCTS_SUCCESS:
            return {
                ...SuccessActionState(state),
                products: action.data,
            }
        case ProductsActionTypes.LOAD_PRODUCTS_ERROR:
            return ErrorActionState(state, action.error)
        case ProductsActionTypes.LOAD_PRODUCT_START:
            return StartActionState(state)
        case ProductsActionTypes.LOAD_PRODUCT_SUCCESS:
            return {
                ...SuccessActionState(state),
                data: action.data,
            }
        case ProductsActionTypes.LOAD_PRODUCT_ERROR:
            return ErrorActionState(state, action.error)
        case ProductsActionTypes.SET_PAGE:
            return {
                ...state,
                page: action.page,
                pageSize: action.pageSize
            }
        default:
            return state
    }
}
