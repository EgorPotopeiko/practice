import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { AxiosResponse } from 'axios';
import { GetRegistrationAdminSuccessAction, GetRegistrationAdminErrorAction, GetRegistrationAdminStartAction } from './../../store/login/actions';
import { put } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* registrationAdmin({ name, email, password, secret }: ReturnType<typeof GetRegistrationAdminStartAction>) {
    try {
        const { data }: AxiosResponse = yield AuthService.registrationAdmin(name, email, password, secret);
        yield put(GetRegistrationAdminSuccessAction(data))
        yield put(GetNotificationOpenAction('success', 'Регистрация админа', 'Регистрация администратора прошла успешно'))
    }
    catch (error) {
        yield put(GetRegistrationAdminErrorAction(error))
        yield put(GetNotificationOpenAction('error', 'Регистрация админа', 'Не удалось зарегистрировать администратора'))
    }
}

export default registrationAdmin