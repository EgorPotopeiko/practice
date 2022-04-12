import $api from '../http';

export default class Authorization {
    static auth(email: any, password: any) {
        return $api.post(`/users/login`, {
            email: email,
            password: password
        })
    }
    static async registration(name: any, email: any, password: any): Promise<any> {
        return $api.post(`/users/register`, {
            name: name,
            email: email,
            password: password
        })
    }
    static logout() {
        return $api.post(`/users/logout`)
    }
    static getUser(jwt: any) {
        return $api.get(`/users/info`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
    }
}
