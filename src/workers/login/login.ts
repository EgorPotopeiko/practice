import { CloseModalAction } from './../../store/modals/actions';
import { RemoveAllFilters } from './../../store/filters/actions';
import { selectPageSize } from './../../store/products/selectors';
import { GetPage } from './../../store/products/actions';
import { AxiosResponse } from 'axios';
import { GetAuthorizationErrorAction, GetAuthorizationSuccessAction, GetAuthorizationStartAction } from './../../store/login/actions';
import { put, select, call } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* login({ email, password }: ReturnType<typeof GetAuthorizationStartAction>) {
    try {
        const pageSize: number = yield select(selectPageSize);
        const tryLogin: AxiosResponse = yield call(AuthService.login, email, password);
        localStorage.setItem('token', tryLogin.data.token)
        yield put(GetPage(1, pageSize))
        yield put(RemoveAllFilters())
        yield put(GetAuthorizationSuccessAction(tryLogin.data.user))
        yield put(CloseModalAction())
    }
    catch (error) { yield put(GetAuthorizationErrorAction(error)) }
}

export default login