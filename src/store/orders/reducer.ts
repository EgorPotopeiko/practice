import { Reducer } from 'redux';
const initialState = {
    orders: JSON.parse(localStorage.getItem("orders")!) || []
};

const removeOrder = (state: any, id: any) => {
    const orders = state.orders;
    return orders.filter((order: any) => order.id !== id)
}

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
        case "REMOVE_ORDER":
            return {
                ...state,
                orders: removeOrder(state, action.id)
            }
        default:
            return state;
    }
}

export default orderReducer