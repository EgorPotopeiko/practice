import React from 'react';
import './App.less';
import { useRoutes } from './routing/routes';
import { RootStateOrAny, useSelector } from 'react-redux';
import ProductPage from './pages/productPage/ProductPage';

function App() {
  const user = useSelector((state: RootStateOrAny) => state.userReducer.user);
  const routes = useRoutes(user.isAuth, user.role);
  return (
    <div className="App">
      <ProductPage />
      {/* {routes} */}
    </div>
  );
}

export default App;
