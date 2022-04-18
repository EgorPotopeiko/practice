import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short name').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required'),
    secret: Yup.string()
});
export default registrationSchema