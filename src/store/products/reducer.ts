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
    data: null,
    totalCount: 0
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TProductsState = {
    products: any[]
    isLoading: boolean
    error: any
    page: number
    pageSize: number
    data: null,
    totalCount: number
}

const deleteProduct = (state: any, id: any) => {
    const products = state.products;
    return products.filter((product: any) => product.id !== id)
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
        case ProductsActionTypes.CREATE_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.product]
            }
        case ProductsActionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                data: null
            }
        case ProductsActionTypes.DELETE_PRODUCT:
            return {
                ...state,
                products: deleteProduct(state, action.id)
            }
        case ProductsActionTypes.SET_PAGE:
            return {
                ...state,
                page: action.page,
                pageSize: action.pageSize
            }
        case ProductsActionTypes.SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.total
            }
        default:
            return state
    }
}
