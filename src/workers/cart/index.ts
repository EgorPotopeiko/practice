import { CartActionTypes } from './../../store/cart/action-types';
import { takeLatest } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import CartDB from '../../services/cart_service';

function* addedToCart(payload: any) {
    try {
        const { products } = payload
        yield call(CartDB.addToCart, products)
    }
    catch (error) { console.log(error) }
}

function* removedToCart(payload: any) {
    try {
        const { products } = payload
        yield call(CartDB.removeToCart, products)
    }
    catch (error) { console.log(error) }
}

export function* cartSaga() {
    yield takeLatest(CartActionTypes.PRODUCT_ADDED, addedToCart);
    yield takeLatest(CartActionTypes.PRODUCT_REMOVED, removedToCart);
}
