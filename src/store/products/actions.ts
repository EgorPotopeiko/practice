import { ProductsActionTypes } from './action-types';

export const GetProductsStartAction = () => ({
    type: ProductsActionTypes.LOAD_PRODUCTS_START
})
export const GetProductsSuccessAction = (data: any, total: number) => ({
    type: ProductsActionTypes.LOAD_PRODUCTS_SUCCESS,
    data,
    total
})
export const GetProductsErrorAction = (error: any) => ({
    type: ProductsActionTypes.LOAD_PRODUCTS_ERROR,
    error
})
export const GetProductStartAction = (id: string) => ({
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
export const CreateProductAction = (product: Array<Object>) => ({
    type: ProductsActionTypes.CREATE_PRODUCT,
    product
})
export const RemoveProductAction = () => ({
    type: ProductsActionTypes.REMOVE_PRODUCT
})
export const DeleteProductAction = (id: string) => ({
    type: ProductsActionTypes.DELETE_PRODUCT,
    id
})
export const GetPage = (page: number, pageSize: number, totalCount?: number) => ({
    type: ProductsActionTypes.SET_PAGE,
    page,
    pageSize,
    totalCount
})