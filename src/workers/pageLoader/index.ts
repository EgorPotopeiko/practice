import { LocationChangeAction, LOCATION_CHANGE } from 'connected-react-router';
import { put, takeEvery } from 'redux-saga/effects';
import { GetProductsStartAction } from '../../store/products/actions';

export default function* pageLoader() {
    yield takeEvery(LOCATION_CHANGE, loaderWorker)
}

function* loaderWorker({ payload }: LocationChangeAction) {
    try {
        const pathname = payload.location.pathname;
        if (pathname === '/' || pathname === '/auth' || pathname === '/admin') {
            yield put(GetProductsStartAction());
        }
    } catch (error: any) {
        console.log(error);
    }
}