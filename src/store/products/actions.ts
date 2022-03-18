import { ProductsActionTypes } from "./action-types"

export const GetProductsStartAction = () => ({
    type: ProductsActionTypes.LOAD_PRODUCTS_START
})
export const GetProductsSuccessAction = (data: any) => ({
    type: ProductsActionTypes.LOAD_PRODUCTS_SUCCESS,
    data
})
export const GetProductsErrorAction = (error: any) => ({
    type: ProductsActionTypes.LOAD_PRODUCTS_ERROR,
    error
})
export const GetPage = (page: any, pageSize: any) => ({
    type: ProductsActionTypes.SET_PAGE,
    page,
    pageSize
})