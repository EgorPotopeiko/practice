import { RootStateOrAny } from 'react-redux';
import { Reducer } from 'redux';
import { TOrder } from '../../models/order';
const initialState = {
    orders: JSON.parse(localStorage.getItem("orders")!) || []
};

const removeOrder = (state: RootStateOrAny, id: string) => {
    const orders = state.orders;
    return orders.filter((order: TOrder) => order.id !== id)
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