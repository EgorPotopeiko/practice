/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetCategoriesErrorAction, GetCategoriesSuccessAction, GetCategoriesStartAction } from './../../store/category/actions';
import { put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';
import { AxiosError, AxiosResponse } from 'axios';

function* load(_action: ReturnType<typeof GetCategoriesStartAction>) {
    try {
        const { data }: AxiosResponse = yield CategoryDB.getCategories()
        yield put(GetCategoriesSuccessAction(data))
    }
    catch (error: AxiosError | any) {
        yield put(GetCategoriesErrorAction(error))
    }
}

export default load