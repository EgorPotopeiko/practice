import { combineReducers } from "redux";
import productsReducer from "./products/reducer";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import { TApplicationState } from "./applicationState";
import filtersReducer from "./filters/reducer";

const store = (history: History) => combineReducers<TApplicationState>({
    router: connectRouter(history),
    products: productsReducer,
    filters: filtersReducer
});

export default store;
