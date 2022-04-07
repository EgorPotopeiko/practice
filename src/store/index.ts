import { combineReducers } from 'redux';
import productsReducer from './products/reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { TApplicationState } from './applicationState';
import filtersReducer from './filters/reducer';
import loginReducer from './login/reducer';
import cartReducer from './cart/reducer';
import modalsReducer from './modals/reducer';

const store = (history: History) => combineReducers<TApplicationState>({
    router: connectRouter(history),
    products: productsReducer,
    filters: filtersReducer,
    login: loginReducer,
    cart: cartReducer,
    modals: modalsReducer
});

export default store;
