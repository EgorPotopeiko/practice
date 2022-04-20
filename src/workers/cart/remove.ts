import { AxiosResponse } from 'axios';
import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { GetRemovedCartAction, GetCartAction } from './../../store/cart/actions';
import { call, put } from 'redux-saga/effects';
import CartDB from '../../services/cart_service';

function* remove({ products }: ReturnType<typeof GetRemovedCartAction>) {
    try {
        yield call(CartDB.removeToCart, products);
        const { data }: AxiosResponse = yield call(CartDB.getCart);
        yield put(GetCartAction(data.products));
        yield put(GetNotificationOpenAction('success', 'Удаление из корзины', 'Продукт удален из корзины'))
    }
    catch (error) {
        console.log(error);
        yield put(GetNotificationOpenAction('error', 'Удаление из корзины', 'Не удалось удалить продукт'))
    }
}

export default remove