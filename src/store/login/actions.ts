import { LoginActionTypes } from './action-types';

export const GetAuthorizationStartAction = (email: string, password: string) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_START,
    email,
    password
})
export const GetAuthorizationSuccessAction = (data: any) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_SUCCESS,
    data
})
export const GetAuthorizationErrorAction = (error: any) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_ERROR,
    error
})
export const GetRegistrationStartAction = (name: string, email: string, password: string) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_START,
    name,
    email,
    password
})
export const GetRegistrationSuccessAction = (data: any) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_SUCCESS,
    data
})
export const GetRegistrationErrorAction = (error: any) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_ERROR,
    error
})
export const GetLogout = (user: any) => ({
    type: LoginActionTypes.LOGOUT,
    user
})
export const setError = () => ({
    type: LoginActionTypes.SET_ERROR
})
