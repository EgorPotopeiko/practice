import { ProductsActionTypes } from './action-types';

export const GetProductsStartAction = () => ({
    type: ProductsActionTypes.LOAD_PRODUCTS_START
})
export const GetAllProductsStartAction = () => ({
    type: ProductsActionTypes.LOAD_ALL_PRODUCTS_START
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
export const CreateProductStartAction = (product: Array<Object>) => ({
    type: ProductsActionTypes.CREATE_PRODUCT_START,
    product
})
export const CreateProductSuccessAction = () => ({
    type: ProductsActionTypes.CREATE_PRODUCT_SUCCESS
})
export const CreateProductErrorAction = (error: any) => ({
    type: ProductsActionTypes.CREATE_PRODUCT_ERROR,
    error
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
export const GetView = (view: string) => ({
    type: ProductsActionTypes.SET_VIEW,
    view
})