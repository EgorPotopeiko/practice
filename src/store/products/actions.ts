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
export const GetProductStartAction = (id: any) => ({
    type: ProductsActionTypes.LOAD_PRODUCT_START,
    id
})
export const GetProductSuccessAction = (data: any) => ({
    type: ProductsActionTypes.LOAD_PRODUCT_SUCCESS,
    data
})
export const GetProductErrorAction = (error: any) => ({
    type: ProductsActionTypes.LOAD_PRODUCT_ERROR,
    error
})
export const CreateProductAction = (product: any) => ({
    type: ProductsActionTypes.CREATE_PRODUCT,
    product
})
export const RemoveProductAction = () => ({
    type: ProductsActionTypes.REMOVE_PRODUCT
})
export const DeleteProductAction = (id: any) => ({
    type: ProductsActionTypes.DELETE_PRODUCT,
    id
})
export const GetPage = (page: number, pageSize: number) => ({
    type: ProductsActionTypes.SET_PAGE,
    page,
    pageSize
})
export const GetProductTotal = (total: any) => ({
    type: ProductsActionTypes.SET_TOTAL_COUNT,
    total
})