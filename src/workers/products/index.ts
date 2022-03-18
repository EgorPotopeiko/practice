import { takeLatest } from 'redux-saga/effects';
import { call, put } from "redux-saga/effects";
import ProductsDB from "../../services";
import { GetProductsErrorAction, GetProductsSuccessAction } from "../../store/products/actions";
import { AxiosResponse } from "axios";
import { ProductsActionTypes } from '../../store/products/action-types';

const database = new ProductsDB();

export function* loadProductList() {
    try {
        const data: AxiosResponse = yield call(database.getAllProducts);
        yield put(GetProductsSuccessAction(data))
    }
    catch (error) {
        yield put(GetProductsErrorAction(error))
    }
}

export function* productsSaga() {
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCTS_START, loadProductList)
}
