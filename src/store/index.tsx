import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import roleReducer from "./roles/roleReducer";
import productsReducer from "./products/productsReducer";
import filterReducer from "./filters/filterReducer";
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