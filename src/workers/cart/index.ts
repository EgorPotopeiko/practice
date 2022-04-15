import { CartActionTypes } from './../../store/cart/action-types';
import { GetCategoriesErrorAction } from './../../store/category/actions';
import { takeLatest } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import CartDB from '../../services/cart_service';

function* addedToCart(payload: any) {
    try {
        const { products } = payload
        yield call(CartDB.addToCart, products)
        //yield put(GetCategoriesSuccessAction(data.data))
    }
    catch (error) { yield put(GetCategoriesErrorAction(error)) }
}

export function* cartSaga() {
    yield takeLatest(CartActionTypes.PRODUCT_ADDED, addedToCart);
}
