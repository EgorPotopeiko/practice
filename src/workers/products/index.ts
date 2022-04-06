import { TFilters } from './../../models/filters';
import { selectAllFilters } from './../../store/filters/selectors';
import { GetProductErrorAction, GetProductSuccessAction } from './../../store/products/actions';
import { selectPage, selectPageSize } from './../../store/products/selectors';
import { FiltersActionTypes } from './../../store/filters/action-types';
import { takeLatest, select } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services';
import { GetProductsErrorAction, GetProductsSuccessAction } from '../../store/products/actions';
import { AxiosResponse } from 'axios';
import { ProductsActionTypes } from '../../store/products/action-types';

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
        localStorage.setItem("product", JSON.stringify(data.data))
        yield put(GetProductSuccessAction(data.data));
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
