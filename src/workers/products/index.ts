import { selectPage, selectPageSize } from './../../store/products/selectors';
import { FiltersActionTypes } from './../../store/filters/action-types';
import { takeLatest, select } from 'redux-saga/effects';
import { call, put } from "redux-saga/effects";
import ProductsDB from '../../services';
import { GetProductErrorAction, GetProductsErrorAction, GetProductsSuccessAction, GetProductSuccessAction } from "../../store/products/actions";
import { AxiosResponse } from "axios";
import { ProductsActionTypes } from '../../store/products/action-types';

const productDatabase = new ProductsDB();

export interface ResponseGenerator {
    [x: string]: any,
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}

function* loadProductList() {
    try {
        const page: AxiosResponse = yield select(selectPage);
        const pageSize: AxiosResponse = yield select(selectPageSize)
        const data: AxiosResponse = yield call(ProductsDB.getAllProducts, page, pageSize);
        yield put(GetProductsSuccessAction(data));
    }
    catch (error) {
        yield put(GetProductsErrorAction(error));
    }
}

function* loadProduct(payload: any) {
    const { id } = payload;
    try {
        const data: AxiosResponse = yield call(productDatabase.getProduct, id);
        yield put(GetProductSuccessAction(data));
    }
    catch (error) {
        yield put(GetProductErrorAction(error));
    }
}

export function* productsSaga() {
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCTS_START, loadProductList);
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCT_START, loadProduct);
    yield takeLatest(FiltersActionTypes.SET_FILTERS, loadProductList);
}
