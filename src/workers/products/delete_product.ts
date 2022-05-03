import { NotificationOpenAction } from './../../store/notifications/actions';
import { DeleteProductAction, GetProductsStartAction } from './../../store/products/actions';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';

function* deleteProduct({ id }: ReturnType<typeof DeleteProductAction>) {
    yield call(ProductsDB.deleteProduct, id);
    yield put(GetProductsStartAction());
    yield put(NotificationOpenAction('success', 'Продукт удален', 'Удаление продукта завершено успешно'))
}

export default deleteProduct