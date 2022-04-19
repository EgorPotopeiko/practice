import * as Yup from "yup";

const createProductSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').required('Required'),
    price: Yup.number().positive().required('Required').max(99999, 'Too Large '),
    category: Yup.array(),
    img: Yup.string()
});

export default createProductSchema