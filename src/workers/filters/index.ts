import { FiltersActionTypes } from './../../store/filters/action-types';
import { selectFilterAvailable, selectFilterMaker, selectFilterPriceRange, selectFilterSearch, selectFilterSort } from './../../store/filters/selectors';
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
    const search: ResponseGenerator = yield select(selectFilterSearch)
    const maker: ResponseGenerator = yield select(selectFilterMaker)
    const available: ResponseGenerator = yield select(selectFilterAvailable)
    const priceRange: ResponseGenerator = yield select(selectFilterPriceRange)
    const sort: ResponseGenerator = yield select(selectFilterSort)
    yield put(GetFilters(search, maker, available, priceRange, sort))
}

export function* paginationSaga() {
    yield takeLatest(FiltersActionTypes.SET_FILTERS, loadFilters)
}
