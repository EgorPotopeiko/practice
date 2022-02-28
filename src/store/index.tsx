import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import roleReducer from "./roles/reducer";
import productsReducer from "./products/reducer";
import filterReducer from "./filters/reducer";
import { connectRouter } from "connected-react-router";
import history from "../history";

const rootReducer = combineReducers({
    router: connectRouter(history),
    authReducer,
    roleReducer,
    productsReducer,
    filterReducer
})

export default rootReducer;