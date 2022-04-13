export const LoginActionTypes = {
    LOAD_AUTHORIZATION_START: '[Authorization] LOAD_AUTHORIZATION_START',
    LOAD_AUTHORIZATION_SUCCESS: '[Authorization] LOAD_AUTHORIZATION_SUCCESS',
    LOAD_AUTHORIZATION_ERROR: '[Authorization] LOAD_AUTHORIZATION_ERROR',

    LOAD_REGISTRATION_START: '[Registration] LOAD_REGISTRATION_START',
    LOAD_REGISTRATION_SUCCESS: '[Registration] LOAD_REGISTRATION_SUCCESS',
    LOAD_REGISTRATION_ERROR: '[Registration] LOAD_REGISTRATION_ERROR',

    LOGOUT: '[Authorization] LOGOUT',

    SET_ERROR: '[Error] SET_ERROR',
    SET_SUCCESS: '[Success] SET_SUCCESS'
} as const;