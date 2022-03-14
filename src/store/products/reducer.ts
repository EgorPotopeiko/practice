import { Reducer } from 'redux';
const initialState = {
    products: JSON.parse(localStorage.getItem("products")!) || []
};

const editProduct = (state: any, id: any, title: any, category: any, available: any) => {
    const products = state.products;
    return products.map((product: any) =>
        product.id === id ? { ...product, title: title, category: category, available: available } : product
    )
}

const deleteProduct = (state: any, id: any) => {
    const products = state.products;
    return products.filter((product: any) => product.id.split('-')[0] !== id)
}

const productsReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products
            }
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.product]
            }
        case "EDIT_PRODUCT":
            return {
                ...state,
                products: editProduct(state, action.id, action.title, action.category, action.available)
            }
        case "DELETE_PRODUCT":
            return {
                ...state,
                products: deleteProduct(state, action.id)
            }
        default:
            return state;
    }
}

export default productsReducer