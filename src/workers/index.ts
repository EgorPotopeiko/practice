import { all, fork } from 'redux-saga/effects';
import { cartSaga } from './cart';
import { categoriesSaga } from './category';
import { loginSaga } from './login';
import { pageLoader } from './pageLoader';
import { productsSaga } from './products';
import { resetSaga } from './reset';

export default function* rootSaga() {
    yield all([
        fork(productsSaga),
        fork(pageLoader),
        fork(loginSaga),
        fork(categoriesSaga),
        fork(cartSaga),
        fork(resetSaga)
    ])
}