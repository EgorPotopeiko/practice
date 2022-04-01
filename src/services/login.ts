/* eslint-disable no-useless-concat */
import $api from '../http';

export default class Authorization {
    static auth(email: any, password: any) {
        return $api.post(`/users/login`, {
            email: email,
            password: password
        })
    }
    static getUser(jwt: any) {
        return $api.get(`/users/info`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
    }
}
