import React from 'react';
import Catalog from './pages/catalog/catalog';
import { nanoid } from 'nanoid';
import './App.less'
import AdminPanel from './pages/adminPanel/AdminPanel';
import { Redirect, Route, Switch } from 'react-router';
import { PUBLIC_PATH } from "./routing/names";

const data = [
  {
    id: nanoid(5),
    name: "Мох Павлиний Хвост",
    description: "Мох",
    price: 10
  },
  {
    id: nanoid(5),
    name: "Барбус вишневый",
    description: "Барбус",
    price: 12,
  },
  {
    id: nanoid(5),
    name: "Тетра светлячок",
    description: "Тетра",
    price: 5
  },
  {
    id: nanoid(5),
    name: 'Хвост',
    description: 'Хвост',
    price: 7,
  },
  {
    id: nanoid(5),
    name: 'Аквариум',
    description: 'Рыбы',
    price: 20,
  },
  {
    id: nanoid(5),
    name: 'Муравьиная ферма',
    description: 'Насекомые',
    price: 2,
  },
]

function App() {
  const { APP, ADMIN } = PUBLIC_PATH;
  return (
    <div className="App">
      <Switch>
        <Route exact path={APP} render={() => (
          <Catalog data={data} />
        )} />
        <Route path={ADMIN} component={AdminPanel} />
        <Redirect to={APP} />
      </Switch>
    </div>
  );
}

export default App;
