import React from 'react';
import './App.less';
import { useRoutes } from './routing/routes';
import { RootStateOrAny, useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state: RootStateOrAny) => state.authReducer.isAuth);
  const role = useSelector((state: RootStateOrAny) => state.userReducer.user.role);
  const routes = useRoutes(auth, role)
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
