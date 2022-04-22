import * as Yup from "yup";

const projectSchema = Yup.object().shape({
    name: Yup.string().required('Название проекта обязательно для заполнения'),
    requestNumber: Yup.string().required('Номер заявки обязателен для заполнения'),
    contractNumber: Yup.string().required('Номер контракта обязателен для заполнения'),
    contractDate: Yup.date().required('Дата контракта обязательна для заполнения'),
    advancePayment: Yup.boolean(),
    igk: Yup.string(),
    budget: Yup.number().positive().required('Поле бюджет обязательно для заполнения'),
    sessionId: Yup.string().required('Выберите сессию'),
    goal: Yup.string(),
    description: Yup.string(),
    completionDate: Yup.date(),
    statusId: Yup.string(),
    files: Yup.array()
});

export default projectSchema