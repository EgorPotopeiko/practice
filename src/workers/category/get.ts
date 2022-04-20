/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetNotificationOpenAction } from '../../store/notifications/actions';
import { GetCategoriesErrorAction, GetCategoriesSuccessAction, GetCategoriesStartAction } from '../../store/category/actions';
import { put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';
import { AxiosError, AxiosResponse } from 'axios';

function* get(_action: ReturnType<typeof GetCategoriesStartAction>) {
    try {
        const { data }: AxiosResponse = yield CategoryDB.getCategories();
        yield put(GetCategoriesSuccessAction(data))
    }
    catch (error: AxiosError | any) {
        yield put(GetCategoriesErrorAction(error));
        yield put(GetNotificationOpenAction('error', 'Получение категории', 'Не удалось загрузить категории'))
    }
}

export default get