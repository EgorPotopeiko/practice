import { FiltersActionTypes } from './../../store/filters/action-types';
import { selectFilters } from './../../store/filters/selectors';
import { takeLatest, select } from 'redux-saga/effects';
import { call, put } from "redux-saga/effects";
import FilteredDB from '../../services/filterData';
import { GetProductsErrorAction, GetProductsSuccessAction } from "../../store/products/actions";
import { AxiosResponse } from "axios";
import { ProductsActionTypes } from '../../store/products/action-types';

const database = new FilteredDB();

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
        const filters: AxiosResponse = yield select(selectFilters)
        const data: AxiosResponse = yield call(database.getFilteredProducts, filters);
        yield put(GetProductsSuccessAction(data))
    }
    catch (error) {
        yield put(GetProductsErrorAction(error))
    }
}

export function* productsSaga() {
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCTS_START, loadProductList)
    yield takeLatest(FiltersActionTypes.SET_FILTERS, loadProductList)
}