import { CategoryActionTypes } from './../../store/category/action-types';
import { takeLatest } from 'redux-saga/effects';
import get from './get';
import createCategory from './create';
import deleteCategory from './delete';

export function* categoriesSaga() {
    yield takeLatest(CategoryActionTypes.LOAD_CATEGORY_START, get);
    yield takeLatest(CategoryActionTypes.CREATE_CATEGORY_START, createCategory);
    yield takeLatest(CategoryActionTypes.DELETE_CATEGORY, deleteCategory);
}
