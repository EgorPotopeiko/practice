import { TApplicationState } from '../applicationState';

export const selectCart = (state: TApplicationState) => state.cart.cartProducts;