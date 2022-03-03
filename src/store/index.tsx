import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import productsReducer from "./products/reducer";
import filterReducer from "./filters/reducer";
import loadingReducer from "./loading/reducer";
import userReducer from "./user/reducer";
import registrationReducer from "./registration/reducer";
import { connectRouter } from "connected-react-router";
import history from "../history";

const rootReducer = combineReducers({
    router: connectRouter(history),
    authReducer,
    productsReducer,
    filterReducer,
    loadingReducer,
    userReducer,
    registrationReducer
})

export default rootReducer;