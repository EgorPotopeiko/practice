import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { put, takeEvery } from "redux-saga/effects";
import { GetProductsStartAction } from "../../store/products/actions";

export default function* pageLoader() {
    yield takeEvery(LOCATION_CHANGE, loaderWorker)
}

export interface ResponseGenerator {
    [x: string]: any,
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}

function* loaderWorker({ payload }: LocationChangeAction) {
    try {
        const pathname = payload.location.pathname;
        if (pathname === '/') {
            yield put(GetProductsStartAction())
        }
    } catch (error: any) {
        console.log(error)
    }
}