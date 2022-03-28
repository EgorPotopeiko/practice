import { LoginActionTypes } from "./action-types"

export const GetAuthorizationStartAction = () => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_START
})
export const GetAuthorizationSuccessAction = (data: any) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_SUCCESS,
    data
})
export const GetAuthorizationErrorAction = (error: any) => ({
    type: LoginActionTypes.LOAD_AUTHORIZATION_ERROR,
    error
})
