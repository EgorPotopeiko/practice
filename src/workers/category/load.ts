import { GetCategoriesErrorAction, GetCategoriesSuccessAction, GetCategoriesStartAction } from './../../store/category/actions';
import { call, put } from 'redux-saga/effects';
import CategoryDB from '../../services/category_service';
import {AxiosError, AxiosResponse} from 'axios';

function* load(_action: ReturnType<typeof GetCategoriesStartAction>) {
    try {
        const {data}: AxiosResponse = yield CategoryDB.getCategories()
        yield put(GetCategoriesSuccessAction(data))
    }
    catch (error: AxiosError | any) {
        console.dir(error)
        const {message} = error as AxiosError
        console.log(message)
        yield put(GetCategoriesErrorAction(error))
    }
}

export default load