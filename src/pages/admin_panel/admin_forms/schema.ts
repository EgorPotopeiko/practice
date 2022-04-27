import * as Yup from "yup";

const projectSchema = Yup.object().shape({
    name: Yup.string().required('Название проекта обязательно для заполнения'),
    requestNumber: Yup.string().required('Номер заявки обязателен для заполнения'),
    contractNumber: Yup.string().required('Номер контракта обязателен для заполнения'),
    contractDate: Yup.string().required('Дата контракта обязательна для заполнения'),
    advancePayment: Yup.boolean(),
    igk: Yup.string(),
    budget: Yup.number().positive().required('Поле бюджет обязательно для заполнения'),
    sessionId: Yup.string().required('Выберите сессию'),
    goal: Yup.string(),
    description: Yup.string(),
    completionDate: Yup.string(),
    statusId: Yup.string(),
    // contentThematicIds: Yup.array().of(Yup.string()).required('Не выбрана тематика контента'),
    // contentDirection: Yup.string().required('Не выбрано направление контента'),
    // contentFormats: Yup.array().required('Не выбран формат контента'),
    // channels: Yup.array(),
    // kpis: Yup.array().required('Отсутствует плановый КПЭ'),
    // imageId: Yup.string(),
    // ownerId: Yup.string().required('Не выбран подрядчик'),
    // producerIds: Yup.array().required('Не выбран продюсер'),
    // coordinatorIds: Yup.array().required('Не выбран координатор'),
    // files: Yup.array()
});

export default projectSchema