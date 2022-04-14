import { GetCategoriesErrorAction, GetCategoriesSuccessAction } from './../../store/category/actions';
import { CategoryActionTypes } from './../../store/category/action-types';
import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';
import { AxiosResponse } from 'axios';

function* loadCategoryList() {
    try {
        const data: AxiosResponse = yield call(CategoryDB.getCategories)
        yield put(GetCategoriesSuccessAction(data.data))
    }
    catch (error) { yield put(GetCategoriesErrorAction(error)) }
}

export function* categoriesSaga() {
    yield takeLatest(CategoryActionTypes.LOAD_CATEGORY_START, loadCategoryList);

}
