/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Reducer } from 'redux';

const updateCartItems = (cartProducts: any, item: any, idx: any) => {
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

const updateCartItem = (product: any, item: any = {}, quantity: any) => {
    const { total = 0, amount = 0 } = item
    return {
        id: product.id,
        title: product.title,
        subcategory: product.subcategory,
        cost: product.cost,
        amount: amount + quantity,
        total: total + quantity * (product.cost)
    }
};

const updateOrder = (state: any, productId: any, action: any, quantity: any) => {
    const newItem = action.item;
    const testMas = state.cartProducts
    const itemIndex = testMas.findIndex((product: any) => product.id === productId);
    const item = testMas[itemIndex];
    const finallyItem = updateCartItem(newItem, item, quantity);
    return {
        cartProducts: updateCartItems(testMas, finallyItem, itemIndex)
    }
};

const cartReducer: Reducer = (state, action) => {
    if (state === undefined) {
        return {
            cartProducts: []
        }
    }
    switch (action.type) {
        case "ADDED_TO_CART":
            const newItem = action.item;
            return updateOrder(state, newItem.id, action, 1);
        case "REMOVED_TO_CART":
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts,
                    action.id
                ]
            }
        case "ALL_REMOVED_TO_CART":
            return {
                ...state,
                cartProducts: [
                    ...state.cartProducts,
                    action.id
                ]
            }
        default:
            return state;
    }
}

export default cartReducer