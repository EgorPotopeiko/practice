export const setProducts = (products: Array<Object>) => {
    return {
        type: "SET_PRODUCTS",
        products
    };
};

export const addProduct = (product: any) => {
    return {
        type: "ADD_PRODUCT",
        product
    }
}

export const editProduct = (id: string, title: string, category: string, available: boolean) => {
    return {
        type: "EDIT_PRODUCT",
        id,
        title,
        category,
        available
    }
}

export const deleteProduct = (id: string) => {
    return {
        type: "DELETE_PRODUCT",
        id
    };
};