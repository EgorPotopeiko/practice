import { CloseModalAction } from './../../store/modals/actions';
import { RemoveAllFilters } from './../../store/filters/actions';
import { selectPageSize } from './../../store/products/selectors';
import { GetPage } from './../../store/products/actions';
import { LoginActionTypes } from './../../store/login/action-types';
import { AxiosResponse } from 'axios';
import { GetAuthorizationErrorAction, GetAuthorizationSuccessAction, GetRegistrationSuccessAction, GetRegistrationErrorAction, GetRegistrationAdminSuccessAction, GetRegistrationAdminErrorAction, GetRefreshSuccessAction, GetRefreshErrorAction } from './../../store/login/actions';
import { put, takeLatest, select, call } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* refresh() {
    try {
        const refreshResponse: AxiosResponse = yield call(AuthService.checkAuth);
        yield put(GetRefreshSuccessAction(refreshResponse.data))
    }
    catch (error) {
        yield put(GetRefreshErrorAction(error))
    }
}

function* login(payload: any) {
    try {
        const { email, password } = payload;
        const pageSize: number = yield select(selectPageSize);
        const tryLogin: AxiosResponse = yield call(AuthService.login, email, password);
        localStorage.setItem('token', tryLogin.data.token)
        yield put(GetPage(1, pageSize))
        yield put(RemoveAllFilters())
        yield put(GetAuthorizationSuccessAction(tryLogin.data.user))
        yield put(CloseModalAction())
    }
    catch (error) {
        yield put(GetAuthorizationErrorAction(error))
    }
}

function* registration(payload: any) {
    try {
        const { name, email, password } = payload;
        const { data: tryRegister }: AxiosResponse = yield AuthService.registration(name, email, password);
        yield put(GetRegistrationSuccessAction(tryRegister))
    }
    catch (error) { yield put(GetRegistrationErrorAction(error)) }
}

function* registrationAdmin(payload: any) {
    try {
        const { name, email, password, secret } = payload;
        const { data: tryRegister }: AxiosResponse = yield AuthService.registrationAdmin(name, email, password, secret);
        yield put(GetRegistrationAdminSuccessAction(tryRegister))
    }
    catch (error) { yield put(GetRegistrationAdminErrorAction(error)) }
}

function* logout() {
    yield call(AuthService.logout)
    yield localStorage.removeItem('token')
}

export function* loginSaga() {
    yield takeLatest(LoginActionTypes.REFRESH_START, refresh);
    yield takeLatest(LoginActionTypes.LOAD_AUTHORIZATION_START, login);
    yield takeLatest(LoginActionTypes.LOAD_REGISTRATION_START, registration);
    yield takeLatest(LoginActionTypes.LOAD_REGISTRATION_ADMIN_START, registrationAdmin);
    yield takeLatest(LoginActionTypes.LOGOUT, logout);
}
