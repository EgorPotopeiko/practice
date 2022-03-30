import { RootStateOrAny } from 'react-redux';

export const selectCart = (state: RootStateOrAny) => state.cart.cartProducts;