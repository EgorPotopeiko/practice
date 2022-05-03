import { NotificationOpenAction } from './../../store/notifications/actions';
import { CreateProductSuccessAction, CreateProductStartAction, CreateProductErrorAction, GetProductsStartAction } from './../../store/products/actions';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';

function* createProduct({ product }: ReturnType<typeof CreateProductStartAction>) {
    try {
        yield call(ProductsDB.createProduct, product);
        yield put(CreateProductSuccessAction());
        yield put(GetProductsStartAction());
        yield put(NotificationOpenAction('success', 'Продукт создан', 'Создание продукта завершено успешно'))
    }
    catch (error) {
        yield put(CreateProductErrorAction(error));
        yield put(NotificationOpenAction('error', 'Продукт не создан', 'Не удалось создать продукт'))
    }
}

export default createProduct