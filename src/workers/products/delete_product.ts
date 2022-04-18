import { GetAllProductsStartAction, DeleteProductAction } from './../../store/products/actions';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';

function* deleteProduct({ id }: ReturnType<typeof DeleteProductAction>) {
    yield call(ProductsDB.deleteProduct, id);
    yield put(GetAllProductsStartAction())
}

export default deleteProduct