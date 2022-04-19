import { selectPageStatus } from './../../store/products/selectors';
import { RemoveAllFilters } from './../../store/filters/actions';
import { ResetProducts, GetPage } from './../../store/products/actions';
import { put, select } from 'redux-saga/effects';

function* resetProducts(_action: ReturnType<typeof ResetProducts>) {
    const { pageSize }: { page: number, pageSize: number } = yield select(selectPageStatus);
    yield put(RemoveAllFilters())
    yield put(GetPage(1, pageSize))
}

export default resetProducts