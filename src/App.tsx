import React from 'react';
import Catalog from './pages/catalog/catalog';
import './App.less';
import AdminPanel from './pages/adminPanel/AdminPanel';
import { Redirect, Route, Switch } from 'react-router';
import { PUBLIC_PATH } from "./routing/names";

function App() {
  const { APP, ADMIN } = PUBLIC_PATH;
  return (
    <div className="App">
      <Switch>
        <Route exact path={APP} component={Catalog} />
        <Route path={ADMIN} component={AdminPanel} />
        <Redirect to={APP} />
      </Switch>
    </div>
  );
}

export default App;
