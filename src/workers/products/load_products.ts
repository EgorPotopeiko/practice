import { GetNotificationOpenAction } from './../../store/notifications/actions';
import { TProduct } from '../../models/product';
import { TFilters } from '../../models/filters';
import { selectFilters } from '../../store/filters/selectors';
import { GetProductsStartAction } from '../../store/products/actions';
import { selectPageStatus } from '../../store/products/selectors';
import { select } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';
import { GetProductsErrorAction, GetProductsSuccessAction } from '../../store/products/actions';
import { AxiosResponse } from 'axios';

function* loadProductList(_action: ReturnType<typeof GetProductsStartAction>) {
    try {
        const { page, pageSize }: { page: number, pageSize: number } = yield select(selectPageStatus);
        const filters: TFilters = yield select(selectFilters);
        const data: AxiosResponse = yield call(ProductsDB.getProducts, page, pageSize, filters);
        const total = data.data.totalCount;
        let newData = data.data.content.map((product: TProduct) => {
            return {
                id: product.id,
                title: product.title,
                img: product.img,
                categories: product.categories,
                price: product.price
            }
        });
        yield put(GetProductsSuccessAction(newData, total))
        yield put(GetNotificationOpenAction('success', 'Получение продуктов', 'Продукты загружены успешно'))
    }
    catch (error) {
        yield put(GetProductsErrorAction(error))
        yield put(GetNotificationOpenAction('error', 'Получение продуктов', 'Не удалось загрузить продукты'))
    }
}

export default loadProductList