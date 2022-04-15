import { CartActionTypes } from './action-types';

export const GetAddedCartAction = (products: Array<object>) => ({
    type: CartActionTypes.PRODUCT_ADDED,
    products
})
export const GetRemovedCartAction = (products: Array<object>) => ({
    type: CartActionTypes.PRODUCT_REMOVED,
    products
})

