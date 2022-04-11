import { TProduct } from './../../models/product';
import { InferValueTypes } from '../../models/common';
import * as actions from './actions'
import { ErrorActionState, StartActionState, SuccessActionState } from '../helpers';
import { ProductsActionTypes } from './action-types';

const initialState: TProductsState = {
    products: [],
    error: null,
    isLoading: false,
    page: 1,
    pageSize: 10,
    product: JSON.parse(localStorage.getItem("product")!) || null,
    totalCount: 0,
    view: 'low_price'
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TProductsState = {
    products: any,
    isLoading: boolean,
    error: any,
    page: number,
    pageSize: number,
    product: null,
    totalCount?: number,
    view: string
}

const deleteProduct = (state: TProductsState, id: string) => {
    const products = state.products;
    return products.filter((product: TProduct) => product.id !== id)
}

export default function productsReducer(state: TProductsState = initialState, action: ActionTypes): TProductsState {
    switch (action.type) {
        case ProductsActionTypes.LOAD_PRODUCTS_START:
            return StartActionState(state)
        case ProductsActionTypes.LOAD_PRODUCTS_SUCCESS:
            return {
                ...SuccessActionState(state),
                products: action.data,
                totalCount: action.total
            }
        case ProductsActionTypes.LOAD_PRODUCTS_ERROR:
            return ErrorActionState(state, action.error)
        case ProductsActionTypes.LOAD_PRODUCT_START:
            return StartActionState(state)
        case ProductsActionTypes.LOAD_PRODUCT_SUCCESS:
            return {
                ...SuccessActionState(state),
                product: action.data,
            }
        case ProductsActionTypes.LOAD_PRODUCT_ERROR:
            return ErrorActionState(state, action.error)
        case ProductsActionTypes.CREATE_PRODUCT_START:
            return StartActionState(state)
        case ProductsActionTypes.CREATE_PRODUCT_SUCCESS:
            return SuccessActionState(state)
        case ProductsActionTypes.CREATE_PRODUCT_ERROR:
            return ErrorActionState(state, action.error)
        case ProductsActionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                product: null
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
                pageSize: action.pageSize,
                totalCount: action.totalCount
            }
        case ProductsActionTypes.SET_VIEW:
            return {
                ...state,
                view: action.view,
                products: state.view === "high_price"
                    ?
                    state.products.sort(function (a: TProduct, b: TProduct) { return a.price - b.price })
                    :
                    state.products.sort(function (a: TProduct, b: TProduct) { return b.price - a.price })
            }
        default:
            return state
    }
}
