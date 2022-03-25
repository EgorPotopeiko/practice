import React from 'react';
import "./App.less";
import { useRoutes } from './routing/routes';
import ProductsDB from './services';

function App() {
    const user = JSON.parse(localStorage.getItem("user")!)
    const routes = useRoutes(user.isAuth, user.role);
    localStorage.setItem("user", JSON.stringify({ role: "user", isAuth: true }))
    ProductsDB.getAllProductWithDatabase()
        .then((res: any) => console.log(res))
        .catch((error: any) => console.log(error))
    return (
        <div className="App">
            {routes}
        </div>
    );
}

export default App;
