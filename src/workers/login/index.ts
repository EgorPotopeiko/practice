import { LoginActionTypes } from './../../store/login/action-types';
import { selectUser } from './../../store/login/selectors';
import { AxiosResponse } from 'axios';
import { GetAuthorizationErrorAction, GetAuthorizationSuccessAction, GetAuthorizationProcessAction, GetRegistrationSuccessAction, GetRegistrationErrorAction } from './../../store/login/actions';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import Authorization from '../../services/login';
import { ResponseGenerator } from '../../models/response-generator';

function* login(payload: any) {
    try {
        const { email, password } = payload;
        const tryLogin: AxiosResponse = yield call(Authorization.auth, email, password);
        localStorage.setItem('token', tryLogin.data.jwt)
        yield put(GetAuthorizationProcessAction(tryLogin))
    }
    catch (error) { yield put(GetAuthorizationErrorAction(error)) }
}

function* registration(payload: any) {
    try {
        const { name, email, password } = payload;
        const { data: tryRegister }: AxiosResponse = yield Authorization.registration(name, email, password);
        yield put(GetRegistrationSuccessAction(tryRegister))
    }
    catch (error) { yield put(GetRegistrationErrorAction(error)) }
}

function* loadInfo() {
    const user: ResponseGenerator = yield select(selectUser);
    if (user.status === 200) {
        const takeData: AxiosResponse = yield call(Authorization.getUser, user.data.jwt);
        const role = takeData.data.name === "admin" ? "admin" : "user";
        yield put(GetAuthorizationSuccessAction({ ...takeData.data, role: role }))
    }
}

function* logout() {
    yield localStorage.removeItem('token')
}

export function* loginSaga() {
    yield takeLatest(LoginActionTypes.LOAD_AUTHORIZATION_START, login);
    yield takeLatest(LoginActionTypes.LOAD_REGISTRATION_START, registration);
    yield takeLatest(LoginActionTypes.LOAD_AUTHORIZATION_PROCESS, loadInfo);
    yield takeLatest(LoginActionTypes.LOGOUT, logout);
}
