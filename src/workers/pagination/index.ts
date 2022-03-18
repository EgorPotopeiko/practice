import { selectPage, selectPageSize } from './../../store/pagination/selectors';
import { GetPage } from './../../store/pagination/actions';
import { put, select, takeLatest } from 'redux-saga/effects';
import { PaginationActionTypes } from './../../store/pagination/action-types';

export interface ResponseGenerator {
    [x: string]: any,
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}

export function* loadPagination() {
    const page: ResponseGenerator = yield select(selectPage)
    const pageSize: ResponseGenerator = yield select(selectPageSize)
    yield put(GetPage(page, pageSize))
}

export function* paginationSaga() {
    yield takeLatest(PaginationActionTypes.SET_PAGE, loadPagination)
}
