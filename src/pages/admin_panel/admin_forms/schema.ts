import * as Yup from "yup";

const projectSchema = Yup.object().shape({
    name: Yup.string().required('Название проекта обязательно для заполнения'),
    requestNumber: Yup.string().required('Номер заявки обязателен для заполнения'),
    contractNumber: Yup.string().required('Номер контракта обязателен'),
    contractDate: Yup.string().required('Дата контракта обязательна для заполнения'),
    advancePayment: Yup.boolean(),
    igk: Yup.string(),
    budget: Yup.number().positive().required('Поле бюджет обязательно для заполнения'),
    sessionId: Yup.string().required('Выберите сессию'),
    goal: Yup.string(),
    description: Yup.string(),
    completionDate: Yup.string(),
    statusId: Yup.string(),
    contentThematicIds: Yup.array().of(Yup.string()).min(1, 'Не выбрана тематика контента'),
    contentDirectionId: Yup.string().required('Не выбрано направление контента'),
    contentFormats: Yup.array().of(Yup.object().shape({
        id: Yup.string(),
        info: Yup.string().required('Не выбрано info'),
        num: Yup.number().positive().required('Не выбрано num'),
        type: Yup.string().required('Не выбран type')
    })).min(1, 'Добавьте формам контента'),
    channels: Yup.array().of(Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required('Не выбрано name'),
        link: Yup.string().required('Не выбрано link'),
        planPublicationCount: Yup.number().positive().required('Не выбрано planPublicationCount'),
        internetResourceId: Yup.string().required('Не выбран internetResourceId')
    })),
    kpis: Yup.array().of(Yup.object().shape({
        id: Yup.string(),
        planCount: Yup.number().positive().required('Не выбрано planCount'),
        typeId: Yup.string().required('Не выбран typeId')
    })).min(1, 'Добавьте плановый КПЭ'),
    imageId: Yup.string(),
    ownerId: Yup.string().required('Не выбран подрядчик'),
    producerIds: Yup.array().of(Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required('Не выбран name')
    })).min(1, 'Добавьте продюсера'),
    coordinatorIds: Yup.array().of(Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required('Не выбран name')
    })).min(1, 'Добавьте координатора'),
    files: Yup.array()
});

export default projectSchema