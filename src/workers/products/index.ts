import { selectFilters } from './../../store/filters/selectors';
import { GetProductErrorAction, GetProductSuccessAction } from './../../store/products/actions';
import { selectPage, selectPageSize } from './../../store/products/selectors';
import { FiltersActionTypes } from './../../store/filters/action-types';
import { takeLatest, select } from 'redux-saga/effects';
import { call, put } from "redux-saga/effects";
import ProductsDB from '../../services';
import { GetProductsErrorAction, GetProductsSuccessAction } from "../../store/products/actions";
import { AxiosResponse } from "axios";
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

function* loadProductList() {
    try {
        const page: AxiosResponse = yield select(selectPage);
        const pageSize: AxiosResponse = yield select(selectPageSize);
        const filters: AxiosResponse = yield select(selectFilters);
        const data: AxiosResponse = yield call(ProductsDB.getAllProducts, page, pageSize, filters);
        const total = data.data.totalCount
        const newData = data.data.content.map((product: any) => {
            return {
                id: product.id,
                title: product.title,
                img: product.imgCart || product.img,
                category: product.category,
                price: product.price,
            }
        })
        yield put(GetProductsSuccessAction(newData, total));
    }
    catch (error) {
        yield put(GetProductsErrorAction(error));
    }
}

function* loadProduct(payload: any) {
    const { id } = payload
    try {
        const data: AxiosResponse = yield call(ProductsDB.getProduct, id);
        yield put(GetProductSuccessAction(data));
    }
    catch (error) {
        yield put(GetProductErrorAction(error));
    }
}

function* createProduct(payload: any) {
    const { product } = payload;
    yield call(ProductsDB.createProduct, product)
}

function* deleteProduct(payload: any) {
    const { id } = payload
    yield call(ProductsDB.deleteProduct, id);
}

export function* productsSaga() {
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCTS_START, loadProductList);
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCT_START, loadProduct);
    yield takeLatest(ProductsActionTypes.SET_PAGE, loadProductList);
    yield takeLatest(ProductsActionTypes.CREATE_PRODUCT, createProduct)
    yield takeLatest(ProductsActionTypes.DELETE_PRODUCT, deleteProduct)
    yield takeLatest(FiltersActionTypes.SET_FILTERS, loadProductList)
}
