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

export const checkEmail = (email: string) => {
    return {
        type: "CHECK_EMAIL",
        email
    }
}

export const checkPassword = (password: string) => {
    return {
        type: "CHECK_PASSWORD",
        password
    }
}