import * as Yup from "yup";

const createCategorySchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').required('Required')
});

export default createCategorySchema;