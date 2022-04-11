import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { StartActionState, SuccessActionState } from '../helpers';
import { LoginActionTypes } from './action-types';
import { TUser } from "../../models/user";

const initialState: TLoginState = {
    user: JSON.parse(localStorage.getItem("user")!) || {
        role: "guest"
    },
    isAuth: localStorage.getItem('token') ? true : false,
    error: null,
    isLoading: false
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TLoginState = {
    user: TUser,
    isAuth: boolean,
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
                isLoading: true,
                isAuth: true
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_SUCCESS:
            return {
                ...SuccessActionState(state),
                isAuth: true,
                user: action.data
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
                user: action.user,
                isAuth: false
            }
        default:
            return state
    }
}
