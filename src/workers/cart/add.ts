import { GetAddedCartAction } from './../../store/cart/actions';
import { call } from 'redux-saga/effects';
import CartDB from '../../services/cart_service';

function* add({ products }: ReturnType<typeof GetAddedCartAction>) {
    try {
        yield call(CartDB.addToCart, products)
    }
    catch (error) { console.log(error) }
}

export default add