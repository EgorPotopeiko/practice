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

export const setEmail = (email: string) => {
    return {
        type: "SET_EMAIL",
        email
    }
}

export const setPassword = (password: string) => {
    return {
        type: "SET_PASSWORD",
        password
    }
}