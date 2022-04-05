import { TProduct } from './../../models/product';
import { CartActionTypes } from './action-types';

export const GetAddedCartAction = (item: TProduct) => ({
    type: CartActionTypes.PRODUCT_ADDED,
    item
})
export const GetRemovedCartAction = (item: TProduct) => ({
    type: CartActionTypes.PRODUCT_REMOVED,
    item
})
export const GetClearCartAction = () => ({
    type: CartActionTypes.CLEAR_CART
})

