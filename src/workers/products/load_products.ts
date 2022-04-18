import { TProduct } from '../../models/product';
import { TFilters } from '../../models/filters';
import { selectAllFilters } from '../../store/filters/selectors';
import { GetProductsStartAction } from '../../store/products/actions';
import { selectPage, selectPageSize } from '../../store/products/selectors';
import { select } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import ProductsDB from '../../services/products_service';
import { GetProductsErrorAction, GetProductsSuccessAction } from '../../store/products/actions';
import { AxiosResponse } from 'axios';

function* loadProductList(_action: ReturnType<typeof GetProductsStartAction>) {
    try {
        const page: number = yield select(selectPage);
        const pageSize: number = yield select(selectPageSize);
        const filters: TFilters = yield select(selectAllFilters);
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
    }
    catch (error) { yield put(GetProductsErrorAction(error)) }
}

export default loadProductList