import { InferValueTypes } from '../../models/common';
import * as actions from './actions'
import { StartActionState, SuccessActionState } from '../helpers';
import { LoginActionTypes } from './action-types';

const initialState: TLoginState = {
    user: {
        role: "guest",
        isAuth: false
    },
    email: "",
    password: "",
    error: null,
    isLoading: false
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TLoginState = {
    user: Object,
    email: string,
    password: string,
    error: null,
    isLoading: boolean
}

export default function loginReducer(state: TLoginState = initialState, action: ActionTypes): TLoginState {
    switch (action.type) {
        case LoginActionTypes.LOAD_AUTHORIZATION_START:
            return {
                ...StartActionState(state),
                email: action.email,
                password: action.password
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_PROCESS:
            return {
                ...SuccessActionState(state),
                user: action.data,
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_SUCCESS:
            return {
                ...SuccessActionState(state),
                user: action.data,
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case LoginActionTypes.LOGOUT:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}
