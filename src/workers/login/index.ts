import { LoginActionTypes } from './../../store/login/action-types';
import {selectCredentials, selectEmail, selectPassword, selectUser} from './../../store/login/selectors';
import { AxiosResponse } from 'axios';
import { GetAuthorizationErrorAction, GetAuthorizationSuccessAction, GetAuthorizationProcessAction } from './../../store/login/actions';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import Authorization from '../../services/login';

export interface ResponseGenerator {
    [x: string]: any,
    config?: any,
    content?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}

function* login() {
    try {
        const {email, password}: {email: string, password: string} = yield select(selectCredentials);
        const tryLogin: AxiosResponse = yield call(Authorization.auth, email, password);
        yield put(GetAuthorizationProcessAction(tryLogin));
    }
    catch (error) {
        yield put(GetAuthorizationErrorAction(error));
    }
}

function* loadInfo() {
    const user: AxiosResponse = yield select(selectUser);
    if (user.status === 200) {
        const takeData: AxiosResponse = yield call(Authorization.getUser, user.data.jwt);
        const role = takeData.data.name === "admin" ? "admin" : "user";
        yield put(GetAuthorizationSuccessAction({ ...takeData.data, role: role, isAuth: true }))
    }
}

export function* loginSaga() {
    yield takeLatest(LoginActionTypes.LOAD_AUTHORIZATION_START, login);
    yield takeLatest(LoginActionTypes.LOAD_AUTHORIZATION_PROCESS, loadInfo);
}
