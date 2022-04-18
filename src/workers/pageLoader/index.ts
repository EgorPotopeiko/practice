import { LOCATION_CHANGE } from 'connected-react-router';
import { takeEvery } from 'redux-saga/effects';
import loaderWorker from './loader';

export default function* pageLoader() {
    yield takeEvery(LOCATION_CHANGE, loaderWorker)
}