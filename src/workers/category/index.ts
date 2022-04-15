import { GetCategoriesErrorAction, GetCategoriesSuccessAction, GetCategoriesStartAction, CreateCategorySuccessAction, CreateCategoryErrorAction } from './../../store/category/actions';
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

function* createCategory(payload: any) {
    try {
        const { title } = payload;
        const data: AxiosResponse = yield call(CategoryDB.createCategory, title)
        yield put(CreateCategorySuccessAction(data.data))
        yield put(GetCategoriesStartAction())
    }
    catch (error) { yield put(CreateCategoryErrorAction(error)) }
}

function* deleteCategory(payload: any) {
    try {
        const { id } = payload;
        yield call(CategoryDB.deleteCategory, id)
        yield put(GetCategoriesStartAction())
    }
    catch (error) { yield put(GetCategoriesErrorAction(error)) }
}

export function* categoriesSaga() {
    yield takeLatest(CategoryActionTypes.LOAD_CATEGORY_START, loadCategoryList);
    yield takeLatest(CategoryActionTypes.CREATE_CATEGORY_START, createCategory);
    yield takeLatest(CategoryActionTypes.DELETE_CATEGORY, deleteCategory);
}
