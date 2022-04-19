import { TProduct } from '../../models/product';
import { GetProductsStartAction } from '../../store/products/actions';
import { selectPageStatus } from '../../store/products/selectors';
import { select } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';
import { GetProductsErrorAction, GetProductsSuccessAction } from '../../store/products/actions';
import { AxiosResponse } from 'axios';

function* loadAllProductList(_action: ReturnType<typeof GetProductsStartAction>) {
    try {
        const pageStatus: { page: number, pageSize: number } = yield select(selectPageStatus);
        const { page, pageSize } = pageStatus;
        const data: AxiosResponse = yield call(ProductsDB.getAllProducts, page, pageSize);
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
    }
    catch (error) { yield put(GetProductsErrorAction(error)) }
}

export default loadAllProductList