import { AxiosResponse } from 'axios';
import { GetRefreshSuccessAction, GetRefreshErrorAction, GetRefreshStartAction } from './../../store/login/actions';
import { put, call } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* refresh(_action: ReturnType<typeof GetRefreshStartAction>) {
    try {
        const { data }: AxiosResponse = yield call(AuthService.checkAuth);
        yield put(GetRefreshSuccessAction(data))
    }
    catch (error) {
        yield put(GetRefreshErrorAction(error))
    }
}

export default refresh