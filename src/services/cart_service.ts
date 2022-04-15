import $api from '../http';

export default class CartDB {

    static addToCart(products: Array<object>): Promise<void> {
        return $api.post(`/card/add`, {
            products
        })
    }

    static removeToCart(products: Array<object>): Promise<void> {
        return $api.post(`/card/remove`, {
            products
        })
    }
}
