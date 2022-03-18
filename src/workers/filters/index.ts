import { FiltersActionTypes } from './../../store/filters/action-types';
import { selectFilterAvailable, selectFilterMaker, selectFilterPriceRange, selectFilterSearch } from './../../store/filters/selectors';
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
    yield put(GetFilters(search, maker, available, priceRange))
}

export function* paginationSaga() {
    yield takeLatest(FiltersActionTypes.SET_FILTERS, loadFilters)
}
