import { GetProductErrorAction, GetProductSuccessAction, GetProductStartAction } from './../../store/products/actions';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';
import { AxiosResponse } from 'axios';

function* loadProduct({ id }: ReturnType<typeof GetProductStartAction>) {
    try {
        const data: AxiosResponse = yield call(ProductsDB.getProduct, id);
        yield put(GetProductSuccessAction(data.data))
    }
    catch (error) { yield put(GetProductErrorAction(error)) }
}

export default loadProduct