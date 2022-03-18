import { combineReducers } from "redux";
import productsReducer from "./products/reducer";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { TApplicationState } from "./applicationState";
import paginationReducer from "./pagination/reducer";


const store = (history: History) => combineReducers<TApplicationState>({
    router: connectRouter(history),
    products: productsReducer,
    pagination: paginationReducer
});

export default store;
