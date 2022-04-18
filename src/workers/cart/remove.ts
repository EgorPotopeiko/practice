import { GetRemovedCartAction } from './../../store/cart/actions';
import { call } from 'redux-saga/effects';
import CartDB from '../../services/cart_service';

function* remove({ products }: ReturnType<typeof GetRemovedCartAction>) {
    try { yield call(CartDB.removeToCart, products) }
    catch (error) { console.log(error) }
}

export default remove