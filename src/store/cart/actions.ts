export const addedToCart = (item: any) => {
    return {
        type: "ADDED_TO_CART",
        item
    }
}

export const removedToCart = (id: string) => {
    return {
        type: "REMOVED_TO_CART",
        id
    }
}

export const allRemovedToCart = (id: string) => {
    return {
        type: "ALL_REMOVED_TO_CART",
        id
    }
}