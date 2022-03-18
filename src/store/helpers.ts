export const StartActionState = function (state: any) {
    return {
        ...state,
        error: null,
        isLoading: true
    }
}
export const SuccessActionState = function (state: any) {
    return {
        ...state,
        error: null,
        isLoading: false
    }
}
export const ErrorActionState = function (state: any, action: any) {
    return {
        ...state,
        isLoading: false,
        error: action.error
    }
}