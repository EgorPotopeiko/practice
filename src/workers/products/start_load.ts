import { put } from 'redux-saga/effects';
import { GetProductsStartAction } from './../../store/products/actions';

function* startLoadProducts() {
    yield put(GetProductsStartAction())
}

export default startLoadProducts