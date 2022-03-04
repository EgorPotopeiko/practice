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

const updateCartItem = (product: any, item: any, quantity: any) => {
    const { id = product.id, title = product.title, desc = product.desc, date = product.date, maker = product.maker, category = product.category, subcategory = product.subcategory, amount = 0, cost = 0 } = item
    return {
        id,
        title,
        desc,
        date,
        maker,
        category,
        subcategory,
        amount: amount + quantity,
        cost: cost + quantity * (+product.cost)
    }
};

const updateOrder = (state: any, productId: any, action: any, quantity: any) => {
    const newItem = action.item;
    const testMas = [
        ...state.cartProducts,
        newItem
    ]
    const itemIndex = testMas.findIndex(({ id }) => id === productId);
    const item = testMas[itemIndex];
    const finallyItem = updateCartItem(newItem, item, quantity);
    return {
        orderTotal: 0,
        cartProducts: updateCartItems(testMas, finallyItem, itemIndex)
    }
};

const cartReducer: Reducer = (state, action) => {
    if (state === undefined) {
        return {
            cartProducts: [],
            orderTotal: 0
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