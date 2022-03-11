export const addedToCart = (item: Object) => {
    return {
        type: "ADDED_TO_CART",
        item
    }
}

export const removedToCart = (item: Object) => {
    return {
        type: "REMOVED_TO_CART",
        item
    }
}

export const clearCart = (empty: Array<Object>) => {
    return {
        type: "CLEAR_CART",
        empty
    }
}
