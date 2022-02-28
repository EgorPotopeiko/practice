import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConnectedRouter } from "connected-react-router";

import store from './store';
import { Provider } from 'react-redux';
import history from './history';
import { ConfigProvider } from 'antd';

ReactDOM.render(
  <ConfigProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);

