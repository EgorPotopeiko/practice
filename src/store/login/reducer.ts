import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { StartActionState, SuccessActionState } from '../helpers';
import { LoginActionTypes } from './action-types';
import { TUser } from "../../models/user";

const initialState: TLoginState = {
    user: { role: "GUEST" } as TUser,
    isAuth: !!localStorage.getItem('token'),
    error: null,
    isLoading: false
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TLoginState = {
    user: TUser,
    isAuth: boolean,
    error: any,
    isLoading: boolean
}

export default function loginReducer(state: TLoginState = initialState, action: ActionTypes): TLoginState {
    switch (action.type) {
        case LoginActionTypes.REFRESH_START:
            return StartActionState(state)
        case LoginActionTypes.REFRESH_SUCCESS:
            return {
                ...SuccessActionState(state),
                user: action.data
            }
        case LoginActionTypes.REFRESH_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_START:
            return {
                ...StartActionState(state)
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_SUCCESS:
            return {
                ...SuccessActionState(state),
                isAuth: true,
                user: action.data,
            }
        case LoginActionTypes.LOAD_AUTHORIZATION_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                user: { ...state.user, role: "GUEST" }
            }
        case LoginActionTypes.LOAD_REGISTRATION_START:
            return {
                ...StartActionState(state)
            }
        case LoginActionTypes.LOAD_REGISTRATION_SUCCESS:
            return {
                ...SuccessActionState(state)
            }
        case LoginActionTypes.LOAD_REGISTRATION_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case LoginActionTypes.LOAD_REGISTRATION_ADMIN_START:
            return {
                ...StartActionState(state)
            }
        case LoginActionTypes.LOAD_REGISTRATION_ADMIN_SUCCESS:
            return {
                ...SuccessActionState(state)
            }
        case LoginActionTypes.LOAD_REGISTRATION_ADMIN_ERROR:
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
        case LoginActionTypes.SET_STATUS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
