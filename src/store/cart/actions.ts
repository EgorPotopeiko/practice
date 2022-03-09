export const addedToCart = (item: any) => {
    return {
        type: "ADDED_TO_CART",
        item
    }
}

export const removedToCart = (item: any) => {
    return {
        type: "REMOVED_TO_CART",
        item
    }
}

export const clearCart = (empty: any) => {
    return {
        type: "CLEAR_CART",
        empty
    }
}
