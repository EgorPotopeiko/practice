export const login = (isAuth: boolean) => {
    return {
        type: "LOGIN",
        isAuth
    }

}

export const logout = (isAuth: boolean) => {
    return {
        type: "LOGOUT",
        isAuth
    }
}