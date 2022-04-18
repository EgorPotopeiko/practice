import { GetCategoriesErrorAction, GetCategoriesStartAction, DeleteCategoryAction } from './../../store/category/actions';
import { call, put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';

function* deleteCategory({ id }: ReturnType<typeof DeleteCategoryAction>) {
    try {
        yield call(CategoryDB.deleteCategory, id)
        yield put(GetCategoriesStartAction())
    }
    catch (error) { yield put(GetCategoriesErrorAction(error)) }
}

export default deleteCategory