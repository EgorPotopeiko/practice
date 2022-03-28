import { takeLatest } from 'redux-saga/effects';
import { ProductsActionTypes } from '../../store/products/action-types';

export interface ResponseGenerator {
    [x: string]: any,
    config?: any,
    content?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}

function* login() {
    // try {

    // }
    // catch (error) {

    // }
}


export function* productsSaga() {
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCTS_START, login);
}
