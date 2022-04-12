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
    isSuccess: '',
    error: null,
    isLoading: false
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TLoginState = {
    user: TUser,
    isAuth: boolean,
    isSuccess: string,
    error: any,
    isLoading: boolean
}

export default function loginReducer(state: TLoginState = initialState, action: ActionTypes): TLoginState {
    switch (action.type) {
        case LoginActionTypes.LOAD_AUTHORIZATION_START:
            return {
                ...StartActionState(state),
                isSuccess: ''
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
                user: action.data,
                isSuccess: 'Success'
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                isSuccess: 'Error'
            }
        case LoginActionTypes.LOAD_REGISTRATION_START:
            return {
                ...StartActionState(state),
                isSuccess: ''
            }
        case LoginActionTypes.LOAD_REGISTRATION_SUCCESS:
            return {
                ...SuccessActionState(state),
                isSuccess: 'Success'
            }
        case LoginActionTypes.LOAD_REGISTRATION_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                isSuccess: 'Error'
            }
        case LoginActionTypes.LOGOUT:
            return {
                ...state,
                user: action.user,
                isAuth: false
            }
        case LoginActionTypes.SET_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
