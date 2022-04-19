import { SuccessActionState } from './../helpers';
import { CartActionTypes } from './action-types';
import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { TProduct } from '../../models/product';

const initialState: TCartState = {
    cartProducts: []
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TCartState = {
    cartProducts: Array<TProduct>
}

export default function cartReducer(state: TCartState = initialState, action: ActionTypes): TCartState {
    switch (action.type) {
        case CartActionTypes.GET_CART:
            return {
                ...state,
                cartProducts: action.products
            }
        case CartActionTypes.PRODUCT_ADDED:
            return SuccessActionState(state);
        case CartActionTypes.PRODUCT_REMOVED:
            return SuccessActionState(state);
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartProducts: []
            }
        default:
            return state
    }
}
