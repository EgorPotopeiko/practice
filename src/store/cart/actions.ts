import { TProduct } from '../../models/product';
import { CartActionTypes } from './action-types';

export const GetCartAction = (products: Array<TProduct>) => ({
    type: CartActionTypes.GET_CART,
    products
})
export const GetAddedCartAction = (products: Array<object>) => ({
    type: CartActionTypes.PRODUCT_ADDED,
    products
})
export const GetRemovedCartAction = (products: Array<object>) => ({
    type: CartActionTypes.PRODUCT_REMOVED,
    products
})
export const GetClearCartAction = () => ({
    type: CartActionTypes.CLEAR_CART
})

