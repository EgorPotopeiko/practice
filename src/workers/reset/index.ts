import { ProductsActionTypes } from './../../store/products/action-types';
import { takeLatest } from 'redux-saga/effects';
import resetProducts from './reset_products';

export function* resetSaga() {
    yield takeLatest(ProductsActionTypes.RESET_PRODUCTS, resetProducts)
}
