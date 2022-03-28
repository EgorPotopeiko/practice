import { all, fork } from "redux-saga/effects";
import { loginSaga } from "./login";
import pageLoader from "./pageLoader";
import { productsSaga } from "./products";

export default function* rootSaga() {
    yield all([
        fork(productsSaga),
        fork(pageLoader),
        fork(loginSaga)
    ])
}