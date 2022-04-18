import { LoginActionTypes } from './../../store/login/action-types';
import { takeLatest } from 'redux-saga/effects';
import refresh from './refresh';
import login from './login';
import registration from './registration';
import registrationAdmin from './registration_admin';
import logout from './logout';

export function* loginSaga() {
    yield takeLatest(LoginActionTypes.REFRESH_START, refresh);
    yield takeLatest(LoginActionTypes.LOAD_AUTHORIZATION_START, login);
    yield takeLatest(LoginActionTypes.LOAD_REGISTRATION_START, registration);
    yield takeLatest(LoginActionTypes.LOAD_REGISTRATION_ADMIN_START, registrationAdmin);
    yield takeLatest(LoginActionTypes.LOGOUT, logout);
}
