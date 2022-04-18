import { GetAllProductsStartAction } from './../../store/products/actions';
import { GetCategoriesStartAction } from './../../store/category/actions';
import { LocationChangeAction } from 'connected-react-router';
import { put } from 'redux-saga/effects';
import { GetProductsStartAction } from '../../store/products/actions';

function* loaderWorker({ payload }: LocationChangeAction) {
    try {
        const pathname = payload.location.pathname;
        if (pathname === '/') {
            yield put(GetProductsStartAction())
            yield put(GetCategoriesStartAction())
        }
        if (pathname === '/admin') {
            yield put(GetAllProductsStartAction())
        }
    }
    catch (error: any) { console.log(error) }
}

export default loaderWorker