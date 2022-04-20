import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { GetProductErrorAction, GetProductSuccessAction, GetProductStartAction } from './../../store/products/actions';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';
import { AxiosResponse } from 'axios';

function* loadProduct({ id }: ReturnType<typeof GetProductStartAction>) {
    try {
        const { data }: AxiosResponse = yield call(ProductsDB.getProduct, id);
        yield put(GetProductSuccessAction(data));
        yield put(GetNotificationOpenAction('success', 'Получение продукта', 'Продукт загружен успешно'))
    }
    catch (error) {
        yield put(GetProductErrorAction(error));
        yield put(GetNotificationOpenAction('error', 'Получение продукта', 'Не удалось получить продукт'))
    }
}

export default loadProduct