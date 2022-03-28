import { LoginActionTypes } from "./action-types"

export const GetAuthorizationStartAction = (email: any, password: any) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_START,
    email,
    password
})
export const GetAuthorizationProcessAction = (data: any) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_PROCESS,
    data
})
export const GetAuthorizationSuccessAction = (data: any) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_SUCCESS,
    data
})
export const GetAuthorizationErrorAction = (error: any) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_ERROR,
    error
})

export const GetLogout = (user: any) => ({
    type: LoginActionTypes.LOGOUT,
    user
})
