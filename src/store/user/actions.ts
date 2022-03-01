export const userData = (id: string, firstName: string, lastName: string, password: string, email: string, role: string) => {
    return {
        type: "USER_DATA",
        payload: {
            id: id,
            firstName,
            lastName,
            password,
            email,
            role
        }
    }

}