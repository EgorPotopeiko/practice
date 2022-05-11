import { TRegistration, TRegistrationAdmin } from './../../models/registration_data';
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
export const GetRegistrationStartAction = (values: TRegistration) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_START,
    values
})
export const GetRegistrationSuccessAction = (data: TUser) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_SUCCESS,
    data
})
export const GetRegistrationErrorAction = (error: any) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_ERROR,
    error
})
export const GetRegistrationAdminStartAction = (values: TRegistrationAdmin) => ({
    type: LoginActionTypes.LOAD_REGISTRATION_ADMIN_START,
    values
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

