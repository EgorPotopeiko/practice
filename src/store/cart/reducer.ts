import { Reducer } from 'redux';

const initialState = {
    cartProducts: [],
    orderTotal: 0
};

const cartReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADDED_TO_CART":
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts,
                    action.item
                ]
            }
        case "REMOVED_TO_CART":
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts,
                    action.id
                ]
            }
        case "ALL_REMOVED_TO_CART":
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts,
                    action.id
                ]
            }
        default:
            return state;
    }
}

export default cartReducer