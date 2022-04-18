import { TProduct } from '../../models/product';
import { CartActionTypes } from './action-types';

export const GetAddedCartAction = (products: Array<object>, cartProduct: TProduct) => ({
    type: CartActionTypes.PRODUCT_ADDED,
    products,
    cartProduct
})
export const GetRemovedCartAction = (products: Array<object>, cartProduct: TProduct) => ({
    type: CartActionTypes.PRODUCT_REMOVED,
    products,
    cartProduct
})
export const GetClearCartAction = () => ({
    type: CartActionTypes.CLEAR_CART,
})

