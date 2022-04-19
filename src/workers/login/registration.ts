import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { AxiosResponse } from 'axios';
import { GetRegistrationSuccessAction, GetRegistrationErrorAction, GetRegistrationStartAction } from './../../store/login/actions';
import { put } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* registration({ name, email, password }: ReturnType<typeof GetRegistrationStartAction>) {
    try {
        const { data: tryRegister }: AxiosResponse = yield AuthService.registration(name, email, password);
        yield put(GetRegistrationSuccessAction(tryRegister))
        yield put(GetNotificationOpenAction('success', 'Регистрация пользователя', 'Регистрация пользователя прошла успешно'))
    }
    catch (error) {
        yield put(GetRegistrationErrorAction(error))
        yield put(GetNotificationOpenAction('error', 'Регистрация пользователя', 'Не удалось зарегистрировать пользователя'))
    }
}

export default registration