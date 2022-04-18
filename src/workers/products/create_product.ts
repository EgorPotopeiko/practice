import { CreateProductSuccessAction, GetAllProductsStartAction, CreateProductStartAction, CreateProductErrorAction } from './../../store/products/actions';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';

function* createProduct({ product }: ReturnType<typeof CreateProductStartAction>) {
    try {
        yield call(ProductsDB.createProduct, product);
        yield put(CreateProductSuccessAction());
        yield put(GetAllProductsStartAction())
    }
    catch (error) { yield put(CreateProductErrorAction(error)) }
}

export default createProduct