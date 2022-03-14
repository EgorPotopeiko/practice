export const setProducts = (products: Array<Object>) => {
    return {
        type: "SET_PRODUCTS",
        products
    };
};

export const editProduct = (id: string, title: string, category: string) => {
    return {
        type: "EDIT_PRODUCT",
        id,
        title,
        category
    }
}

export const deleteProduct = (id: string) => {
    return {
        type: "DELETE_PRODUCT",
        id
    };
};