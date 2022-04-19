import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { CreateProductSuccessAction, GetAllProductsStartAction, CreateProductStartAction, CreateProductErrorAction } from './../../store/products/actions';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';

function* createProduct({ product }: ReturnType<typeof CreateProductStartAction>) {
    try {
        yield call(ProductsDB.createProduct, product);
        yield put(CreateProductSuccessAction());
        yield put(GetAllProductsStartAction())
        yield put(GetNotificationOpenAction('success', 'Продукт создан', 'Создание продукта завершено успешно'))
    }
    catch (error) {
        yield put(CreateProductErrorAction(error))
        yield put(GetNotificationOpenAction('error', 'Продукт не создан', 'Не удалось создать продукт'))
    }
}

export default createProduct