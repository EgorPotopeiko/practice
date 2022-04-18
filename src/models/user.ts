export type TUser = {
    id: number,
    email: string,
    role: TUserRole,
    name: string
}
export type TUserRole = 'ADMIN' | 'USER' | 'GUEST'