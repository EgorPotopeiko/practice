import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { GetLogout } from './../../store/login/actions';
import { call, put } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* logout(_action: ReturnType<typeof GetLogout>) {
    try {
        yield call(AuthService.logout);
        yield localStorage.removeItem('token');
        yield put(GetNotificationOpenAction('success', 'Выход из аккаунта', 'Произошел выход из аккаунта'))
    }
    catch (error) {
        console.log(error);
        yield put(GetNotificationOpenAction('error', 'Выход из аккаунта', 'Не удалось выйти из аккаунта'))
    }

}

export default logout