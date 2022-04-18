import { AxiosResponse } from 'axios';
import { GetRegistrationAdminSuccessAction, GetRegistrationAdminErrorAction, GetRegistrationAdminStartAction } from './../../store/login/actions';
import { put } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* registrationAdmin({ name, email, password, secret }: ReturnType<typeof GetRegistrationAdminStartAction>) {
    try {
        const { data: tryRegister }: AxiosResponse = yield AuthService.registrationAdmin(name, email, password, secret);
        yield put(GetRegistrationAdminSuccessAction(tryRegister))
    }
    catch (error) { yield put(GetRegistrationAdminErrorAction(error)) }
}

export default registrationAdmin