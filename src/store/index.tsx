import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import roleReducer from "./roles/reducer";
import productsReducer from "./products/reducer";
import filterReducer from "./filters/reducer";
import loadingReducer from "./loading/reducer";
import { connectRouter } from "connected-react-router";
import history from "../history";

const rootReducer = combineReducers({
    router: connectRouter(history),
    authReducer,
    roleReducer,
    productsReducer,
    filterReducer,
    loadingReducer
})

export default rootReducer;