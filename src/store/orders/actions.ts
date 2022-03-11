export const createOrder = (order: any) => {
    return {
        type: "CREATE_ORDER",
        order,
    }
}

export const removeOrder = (id: string) => {
    return {
        type: "REMOVE_ORDER",
        id
    }
}
