import { FiltersActionTypes } from './../../store/filters/action-types';
import { takeLatest } from 'redux-saga/effects';
import { ProductsActionTypes } from '../../store/products/action-types';
import loadAllProductList from './load_all_products';
import loadProductList from './load_products';
import loadProduct from './load_product';
import createProduct from './create_product';
import deleteProduct from './delete_product';
import startLoadProducts from './start_load';

export function* productsSaga() {
    yield takeLatest(ProductsActionTypes.LOAD_ALL_PRODUCTS_START, loadAllProductList);
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCTS_START, loadProductList);
    yield takeLatest(ProductsActionTypes.LOAD_PRODUCT_START, loadProduct);
    yield takeLatest(ProductsActionTypes.SET_PAGE, startLoadProducts);
    yield takeLatest(ProductsActionTypes.CREATE_PRODUCT_START, createProduct);
    yield takeLatest(ProductsActionTypes.DELETE_PRODUCT, deleteProduct);
    yield takeLatest(FiltersActionTypes.SET_FILTERS, startLoadProducts)
}
