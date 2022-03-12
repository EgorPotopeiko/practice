/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.less';
import { useRoutes } from './routing/routes';
import { RootStateOrAny, useSelector } from 'react-redux';

function App() {
  const user = useSelector((state: RootStateOrAny) => state.userReducer.user);
  const products = useSelector((state: RootStateOrAny) => state.productsReducer.products);
  const listCategories = useSelector((state: RootStateOrAny) => state.filterReducer.listCategories);
  const routes = useRoutes(user.isAuth, user.role, products);
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(listCategories))
  }, [listCategories])
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
