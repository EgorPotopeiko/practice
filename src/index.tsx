import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import Modals from './components/modals/modals';
import Notifications from './components/notifications/notifications';
import configureStore from './configureStore';
import history from './history';

const { store } = configureStore({}, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
            <Modals />
            <Notifications />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

