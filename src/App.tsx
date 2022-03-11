import React from 'react';
import './App.less';
import { useRoutes } from './routing/routes';
import { RootStateOrAny, useSelector } from 'react-redux';

function App() {
  const user = useSelector((state: RootStateOrAny) => state.userReducer.user);
  const products = useSelector((state: RootStateOrAny) => state.productsReducer.products);
  const routes = useRoutes(user.isAuth, user.role, products);
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
