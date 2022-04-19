import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { CloseModalAction } from './../../store/modals/actions';
import { RemoveAllFilters } from './../../store/filters/actions';
import { selectPageStatus } from './../../store/products/selectors';
import { GetPage } from './../../store/products/actions';
import { AxiosResponse } from 'axios';
import { GetAuthorizationErrorAction, GetAuthorizationSuccessAction, GetAuthorizationStartAction } from './../../store/login/actions';
import { put, select, call } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* login({ email, password }: ReturnType<typeof GetAuthorizationStartAction>) {
    try {
        const { pageSize }: { page: number, pageSize: number } = yield select(selectPageStatus);
        const { data }: AxiosResponse = yield call(AuthService.login, email, password);
        localStorage.setItem('token', data.token)
        yield put(GetPage(1, pageSize))
        yield put(RemoveAllFilters())
        yield put(GetAuthorizationSuccessAction(data.user))
        yield put(CloseModalAction())
        yield put(GetNotificationOpenAction('success', 'Авторизация', 'Авторизация прошла успешно'))
    }
    catch (error) {
        yield put(GetAuthorizationErrorAction(error))
        yield put(GetNotificationOpenAction('error', 'Авторизация', 'Не удалось авторизироваться'))
    }
}

export default login