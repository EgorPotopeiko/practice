import { Reducer } from 'redux';
const initialState = {
    orders: []
};

const orderReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_ORDER":
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.order
                ]
            }
        default:
            return state;
    }
}

export default orderReducer