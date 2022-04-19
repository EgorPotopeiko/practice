import { TUser } from './../../models/user';
import { LoginActionTypes } from './action-types';

export const GetRefreshStartAction = () => ({
    type: LoginActionTypes.REFRESH_START
})
export const GetRefreshSuccessAction = (data: TUser) => ({
    type: LoginActionTypes.REFRESH_SUCCESS,
    data
})
export const GetRefreshErrorAction = (error: any) => ({
    type: LoginActionTypes.REFRESH_ERROR,
    error
})
export const GetAuthorizationStartAction = (email: string, password: string) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_START,
    email,
    password
})
export const GetAuthorizationSuccessAction = (data: TUser) => ({
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
export const GetRegistrationSuccessAction = (data: TUser) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_SUCCESS,
    data
})
export const GetRegistrationErrorAction = (error: any) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_ERROR,
    error
})
export const GetRegistrationAdminStartAction = (name: string, email: string, password: string, secret: string) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_ADMIN_START,
    name,
    email,
    password,
    secret
})
export const GetRegistrationAdminSuccessAction = (data: TUser) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_ADMIN_SUCCESS,
    data
})
export const GetRegistrationAdminErrorAction = (error: any) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_ADMIN_ERROR,
    error
})
export const GetLogout = (user: any) => ({
    type: LoginActionTypes.LOGOUT,
    user
})
export const SetStatus = (success: string) => ({
    type: LoginActionTypes.SET_STATUS,
    success
})

