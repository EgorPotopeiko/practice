import { CartActionTypes } from './action-types';
import { InferValueTypes } from '../../models/common';
import * as actions from './actions';
import { AnyAction } from 'redux';
import { TProduct } from '../../models/product';
import { RootStateOrAny } from 'react-redux';

const initialState: TCartState = {
    cartProducts: []
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TCartState = {
    cartProducts: Array<TProduct>
}

const updateCartItems = (cartProducts: Array<TProduct>, item: any, idx: number) => {
    if (item.amount === 0) {
        return [
            ...cartProducts.slice(0, idx),
            ...cartProducts.slice(idx + 1)
        ]
    }
    if (idx === -1) {
        return [
            ...cartProducts,
            item
        ];
    }
    return [
        ...cartProducts.slice(0, idx),
        item,
        ...cartProducts.slice(idx + 1)
    ]
};

const updateCartItem = (product: any, item: any = {}, quantity: number) => {
    const { total = 0, amount = 0 } = item
    return {
        id: product.id,
        title: product.title,
        price: product.price,
        categories: product.categories,
        amount: amount + quantity,
        total: total + quantity * (product.price)
    }
};

const updateOrder = (state: RootStateOrAny, productId: number, action: AnyAction, quantity: number) => {
    const newItem = action.cartProduct;
    const testMas = state.cartProducts;
    const itemIndex = testMas.findIndex((product: TProduct) => product.id === productId);
    const item = testMas[itemIndex];
    const finallyItem = updateCartItem(newItem, item, quantity);
    return {
        cartProducts: updateCartItems(testMas, finallyItem, itemIndex)
    }
};

export default function cartReducer(state: TCartState = initialState, action: ActionTypes): TCartState {
    if (state === undefined) {
        return {
            cartProducts: []
        }
    }
    switch (action.type) {
        case CartActionTypes.PRODUCT_ADDED:
            return updateOrder(state, action.cartProduct.id, action, 1);
        case CartActionTypes.PRODUCT_REMOVED:
            return updateOrder(state, action.cartProduct.id, action, -1);
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartProducts: []
            }
        default:
            return state
    }
}
