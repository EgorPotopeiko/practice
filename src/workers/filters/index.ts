import { FiltersActionTypes } from './../../store/filters/action-types';
import { filterSearch, filterMaker, filterAvailable, filterPriceRange } from './../../store/filters/selectors';
import { put, select, takeLatest } from 'redux-saga/effects';
import { GetFilters } from '../../store/filters/actions';

export interface ResponseGenerator {
    [x: string]: any,
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}

export function* loadFilters() {
    const search: ResponseGenerator = yield select(filterSearch)
    const maker: ResponseGenerator = yield select(filterMaker)
    const available: ResponseGenerator = yield select(filterAvailable)
    const priceRange: ResponseGenerator = yield select(filterPriceRange)
    yield put(GetFilters(search, maker, available, priceRange))
}

export function* paginationSaga() {
    yield takeLatest(FiltersActionTypes.SET_FILTERS, loadFilters)
}
