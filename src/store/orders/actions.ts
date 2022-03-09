export const createOrder = (order: any) => {
    return {
        type: "CREATE_ORDER",
        order,
    }
}

export const removeOrder = (id: any) => {
    return {
        type: "REMOVE_ORDER",
        id
    }
}
