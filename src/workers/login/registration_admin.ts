import { NotificationOpenAction } from './../../store/notifications/actions';
import { AxiosResponse } from 'axios';
import { GetRegistrationAdminSuccessAction, GetRegistrationAdminErrorAction, GetRegistrationAdminStartAction } from './../../store/login/actions';
import { put } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* registrationAdmin({ values }: ReturnType<typeof GetRegistrationAdminStartAction>) {
    try {
        const { data }: AxiosResponse = yield AuthService.registrationAdmin(values.name, values.email, values.password, values.secret);
        yield put(GetRegistrationAdminSuccessAction(data));
        yield put(NotificationOpenAction('success', 'Регистрация админа', 'Регистрация администратора прошла успешно'))
    }
    catch (error) {
        yield put(GetRegistrationAdminErrorAction(error));
        yield put(NotificationOpenAction('error', 'Регистрация админа', 'Не удалось зарегистрировать администратора'))
    }
}

export default registrationAdmin