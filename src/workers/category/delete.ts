import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { GetCategoriesErrorAction, GetCategoriesStartAction, DeleteCategoryAction } from './../../store/category/actions';
import { call, put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';

function* deleteCategory({ id }: ReturnType<typeof DeleteCategoryAction>) {
    try {
        yield call(CategoryDB.deleteCategory, id);
        yield put(GetCategoriesStartAction());
        yield put(GetNotificationOpenAction('success', 'Удаление категории', 'Категория удалена успешно'))
    }
    catch (error) {
        yield put(GetCategoriesErrorAction(error));
        yield put(GetNotificationOpenAction('error', 'Удаление категории', 'Не удалось удалить категорию'))
    }
}

export default deleteCategory