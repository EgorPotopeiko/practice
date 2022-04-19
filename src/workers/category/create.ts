/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { GetCategoriesStartAction, CreateCategorySuccessAction, CreateCategoryErrorAction, CreateCategoryStartAction } from './../../store/category/actions';
import { call, put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';
import { AxiosError, AxiosResponse } from 'axios';

function* createCategory({ title }: ReturnType<typeof CreateCategoryStartAction>) {
    try {
        const { data }: AxiosResponse = yield call(CategoryDB.createCategory, title)
        yield put(CreateCategorySuccessAction(data))
        yield put(GetCategoriesStartAction())
        yield put(GetNotificationOpenAction('success', 'Создание категории', 'Категория создана успешно'))
    }
    catch (error: AxiosError | any) {
        yield put(CreateCategoryErrorAction(error))
        yield put(GetNotificationOpenAction('error', 'Создание категории', 'Не удалось создать категорию'))
    }
}

export default createCategory