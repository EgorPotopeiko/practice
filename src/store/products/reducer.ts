import { Reducer } from 'redux';
const initialState = {
    products: []
};

const productsReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products
            }
        default:
            return state;
    }
}

export default productsReducer