export const setFirstName = (firstName: string) => {
    return {
        type: "SET_FIRSTNAME",
        firstName
    }
}

export const setLastName = (lastName: string) => {
    return {
        type: "SET_LASTNAME",
        lastName
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