import { TRegistration } from "../../../models/registration_data";

export default class UserCreateDTO {
    name: string;
    email: string;
    password: string;
    constructor(data: TRegistration) {
        this.name = data.name
        this.email = data.email
        this.password = data.password
    }
}