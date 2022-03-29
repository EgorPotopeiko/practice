import { CartActionTypes } from "./action-types"

export const GetAddedCartAction = (item: any) => ({
    type: CartActionTypes.PRODUCT_ADDED,
    item
})
export const GetRemovedCartAction = (item: any) => ({
    type: CartActionTypes.PRODUCT_REMOVED,
    item
})
export const GetClearCartAction = (empty: Array<Object>) => ({
    type: CartActionTypes.CLEAR_CART,
    empty
})

