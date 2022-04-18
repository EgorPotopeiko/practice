import { GetCategoriesStartAction, CreateCategorySuccessAction, CreateCategoryErrorAction, CreateCategoryStartAction } from './../../store/category/actions';
import { call, put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';
import {AxiosError, AxiosResponse} from 'axios';

function* createCategory({ title }: ReturnType<typeof CreateCategoryStartAction>) {
    try {
        const {data}: AxiosResponse = yield call(CategoryDB.createCategory, title)
        yield put(CreateCategorySuccessAction(data))
        yield put(GetCategoriesStartAction())
    }
    catch (error: AxiosError | any) {
        yield put(CreateCategoryErrorAction(error))
    }
}

export default createCategory