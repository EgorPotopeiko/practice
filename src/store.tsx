import { createStore } from "redux";
import rootReducer from "./store/index";
import { composeWithDevTools } from "redux-devtools-extension";

const store: any = createStore(rootReducer, composeWithDevTools());

export default store;
