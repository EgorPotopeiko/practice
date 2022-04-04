import { TProduct } from './../../models/product';
import { CartActionTypes } from './action-types';
import { RootStateOrAny } from 'react-redux';
import { AnyAction } from 'redux';
import { InferValueTypes } from '../../models/common';
import * as actions from './actions';

const initialState: TCartState = {
    cartProducts: []
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type TCartState = {
    cartProducts: Array<Object>
}

const updateCartItems = (cartProducts: Array<Object>, item: any, idx: number) => {
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
}

const updateCartItem = (product: TProduct, item: any = {}, quantity: number) => {
    const { total = 0, amount = 0 } = item;
    return {
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        img: product.img,
        amount: amount + quantity,
        total: total + quantity * (product.price)
    }
}

const updateOrder = (state: RootStateOrAny, productId: string, action: AnyAction, quantity: number) => {
    const newItem = action.item;
    const testMas = state.cartProducts;
    const itemIndex = testMas.findIndex((product: TProduct) => product.id === productId);
    const item = testMas[itemIndex];
    const finallyItem = updateCartItem(newItem, item, quantity);
    return {
        cartProducts: updateCartItems(testMas, finallyItem, itemIndex)
    }
}

export default function cartReducer(state: TCartState = initialState, action: ActionTypes): TCartState {
    if (state === undefined) {
        return {
            cartProducts: []
        }
    }
    switch (action.type) {
        case CartActionTypes.PRODUCT_ADDED:
            return updateOrder(state, action.item.id, action, 1)
        case CartActionTypes.PRODUCT_REMOVED:
            return updateOrder(state, action.item.id, action, -1)
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartProducts: action.empty
            }
        default:
            return state
    }
}
