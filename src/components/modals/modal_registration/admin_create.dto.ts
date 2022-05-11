import { TRegistrationAdmin } from './../../../models/registration_data';

export default class AdminCreateDTO {
    name: string;
    email: string;
    password: string;
    secret: string;
    constructor(data: TRegistrationAdmin) {
        this.name = data.name
        this.email = data.email
        this.password = data.password
        this.secret = data.secret
    }
}