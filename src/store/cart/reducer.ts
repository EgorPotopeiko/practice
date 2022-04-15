import { CartActionTypes } from './action-types';
import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { SuccessActionState } from '../helpers';

const initialState: TCartState = {
    cartProducts: []
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TCartState = {
    cartProducts: Array<object>
}

export default function cartReducer(state: TCartState = initialState, action: ActionTypes): TCartState {
    if (state === undefined) {
        return {
            cartProducts: []
        }
    }
    switch (action.type) {
        case CartActionTypes.PRODUCT_ADDED:
            return {
                ...SuccessActionState(state)
            }
        case CartActionTypes.PRODUCT_REMOVED:
            return {
                ...SuccessActionState(state)
            }
        default:
            return state
    }
}
