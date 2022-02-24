import React from 'react';
import Catalog from './pages/catalog/catalog';
import { nanoid } from 'nanoid';
import './App.less'
import AdminPanel from './pages/adminPanel/AdminPanel';
import { Redirect, Route, Switch } from 'react-router';

const data = [
  {
    id: nanoid(5),
    name: "Мох Павлиний Хвост",
    price: 10
  },
  {
    id: nanoid(5),
    name: "Барбус вишневый",
    price: 12,
  },
  {
    id: nanoid(5),
    name: "Тетра светлячок",
    price: 5
  }
]

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <Catalog data={data} />
        )} />
        <Route path="/admin" component={AdminPanel} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
