import { TFilters } from './../../models/filters';
import { selectAllFilters } from './../../store/filters/selectors';
import { GetProductErrorAction, GetProductSuccessAction, CreateProductSuccessAction, GetProductsStartAction, GetAllProductsStartAction } from './../../store/products/actions';
import { selectPage, selectPageSize } from './../../store/products/selectors';
import { FiltersActionTypes } from './../../store/filters/action-types';
import { takeLatest, select } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';
import { GetProductsErrorAction, GetProductsSuccessAction } from '../../store/products/actions';
import { AxiosResponse } from 'axios';
import { ProductsActionTypes } from '../../store/products/action-types';

function* startLoadProducts() {
    yield put(GetProductsStartAction())
}

function* loadAllProductList() {
    try {
        const page: number = yield select(selectPage);
        const pageSize: number = yield select(selectPageSize);
        const data: AxiosResponse = yield call(ProductsDB.getAllProducts, page, pageSize);
        const total = data.data.totalCount;
        let newData = data.data.content.map((product: any) => {
            return {
                id: product.id,
                title: product.title,
                img: product.img,
                categories: product.categories,
                price: product.price
            }
        });
        yield put(GetProductsSuccessAction(newData, total))
    }
    catch (error) { yield put(GetProductsErrorAction(error)) }
}

function* loadProductList() {
    try {
        const page: number = yield select(selectPage);
        const pageSize: number = yield select(selectPageSize);
        const filters: TFilters = yield select(selectAllFilters);
        const data: AxiosResponse = yield call(ProductsDB.getProducts, page, pageSize, filters);
        const total = data.data.totalCount;
        let newData = data.data.content.map((product: any) => {
            return {
                id: product.id,
                title: product.title,
                img: product.img,
                categories: product.categories,
                price: product.price
            }
        });
        yield put(GetProductsSuccessAction(newData, total))
    }
    catch (error) { yield put(GetProductsErrorAction(error)) }
}

function* loadProduct(payload: any) {
    const { id } = payload;
    try {
        const data: AxiosResponse = yield call(ProductsDB.getProduct, id);
        yield put(GetProductSuccessAction(data.data))
    }
    catch (error) { yield put(GetProductErrorAction(error)) }
}

function* createProduct(payload: any) {
    const { product } = payload;
    yield call(ProductsDB.createProduct, product);
    yield put(CreateProductSuccessAction());
    yield put(GetAllProductsStartAction())
}

function* deleteProduct(payload: any) {
    const { id } = payload;
    yield call(ProductsDB.deleteProduct, id);
    yield put(GetProductsStartAction())
}

export function* productsSaga() {
    yield takeLatest(ProductsActionTypes.LOAD_ALL_PRODUCTS_START, loadAllProductList);
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCTS_START, loadProductList);
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCT_START, loadProduct);
    yield takeLatest(ProductsActionTypes.SET_PAGE, startLoadProducts);
    yield takeLatest(ProductsActionTypes.CREATE_PRODUCT_START, createProduct);
    yield takeLatest(ProductsActionTypes.DELETE_PRODUCT, deleteProduct);
    yield takeLatest(FiltersActionTypes.SET_FILTERS, startLoadProducts)
}
