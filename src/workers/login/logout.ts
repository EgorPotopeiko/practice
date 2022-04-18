import { GetLogout } from './../../store/login/actions';
import { call } from 'redux-saga/effects';
import AuthService from '../../services/auth_service';

function* logout(_action: ReturnType<typeof GetLogout>) {
    yield call(AuthService.logout)
    yield localStorage.removeItem('token')
}

export default logout