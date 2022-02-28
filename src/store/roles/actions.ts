export const userRole = (role: string) => {
    return {
        type: "USER_ROLE",
        role
    }

}

export const adminRole = (role: string) => {
    return {
        type: "ADMIN_ROLE",
        role
    }
}

export const guestRole = (role: string) => {
    return {
        type: "GUEST_ROLE",
        role
    }
}