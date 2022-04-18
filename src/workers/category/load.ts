import { GetCategoriesErrorAction, GetCategoriesSuccessAction, GetCategoriesStartAction } from './../../store/category/actions';
import { call, put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';
import { AxiosResponse } from 'axios';

function* load(_action: ReturnType<typeof GetCategoriesStartAction>) {
    try {
        const data: AxiosResponse = yield call(CategoryDB.getCategories)
        yield put(GetCategoriesSuccessAction(data.data))
    }
    catch (error) { yield put(GetCategoriesErrorAction(error)) }
}

export default load