import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { GetAddedCartAction } from './../../store/cart/actions';
import { call, put } from 'redux-saga/effects';
import CartDB from '../../services/cart_service';

function* add({ products }: ReturnType<typeof GetAddedCartAction>) {
    try {
        yield call(CartDB.addToCart, products)
        yield put(GetNotificationOpenAction('success', 'Добавление в корзину', 'Продукт добавлен в корзину'))
    }
    catch (error) {
        console.log(error)
        yield put(GetNotificationOpenAction('error', 'Добавление в корзину', 'Не удалось добавить продукт'))
    }
}

export default add