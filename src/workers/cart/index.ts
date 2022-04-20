import { CartActionTypes } from './../../store/cart/action-types';
import { takeLatest } from 'redux-saga/effects';
import add from './add';
import remove from './remove';

export function* cartSaga() {
    yield takeLatest(CartActionTypes.PRODUCT_ADDED, add);
    yield takeLatest(CartActionTypes.PRODUCT_REMOVED, remove)
}
