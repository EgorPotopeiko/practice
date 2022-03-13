/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.less';
import { useRoutes } from './routing/routes';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import ProductsDB from './services';
import { setProducts } from './store/products/actions';
import { changeLoading } from './store/loading/actions';

function App() {
  const user = useSelector((state: RootStateOrAny) => state.userReducer.user);
  const products = useSelector((state: RootStateOrAny) => state.productsReducer.products);
  const listCategories = useSelector((state: RootStateOrAny) => state.filterReducer.listCategories);
  const routes = useRoutes(user.isAuth, user.role, products);
  const database = new ProductsDB();
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      database.getAllProducts()
        .then(response => { dispatch(setProducts(response)) }
        )
        .then(() => dispatch(changeLoading(false)))
    }
    else {
      dispatch(setProducts(products))
      localStorage.setItem("products", JSON.stringify(JSON.parse(localStorage.getItem("products")!)))
      dispatch(changeLoading(false))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])
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
