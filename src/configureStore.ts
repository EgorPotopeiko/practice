import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';
import rootSaga from './workers/index';
import reducers from './store';

const IS_BROWSER = typeof window !== 'undefined';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
const composeEnhancers = (IS_BROWSER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
function configureStore(initialState = {}, history: History) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducers(history),
        initialState,
        composeEnhancers(applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware
        )),
    );

    sagaMiddleware.run(rootSaga);

    return { store };
}

export default configureStore;