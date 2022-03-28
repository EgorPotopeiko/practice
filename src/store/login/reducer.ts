import { InferValueTypes } from '../../models/common';
import * as actions from './actions'
import { ErrorActionState, StartActionState, SuccessActionState } from '../helpers';
import { LoginActionTypes } from './action-types';

const initialState: TProductsState = {
    user: null
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TProductsState = {
    user: null
}

export default function productsReducer(state: TProductsState = initialState, action: ActionTypes): TProductsState {
    switch (action.type) {
        case LoginActionTypes.LOAD_AUTHORIZATION_START:
            return StartActionState(state)
        case LoginActionTypes.LOAD_AUTHORIZATION_SUCCESS:
            return {
                ...SuccessActionState(state),
                user: action.data,
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_ERROR:
            return ErrorActionState(state, action.error)
        default:
            return state
    }
}
