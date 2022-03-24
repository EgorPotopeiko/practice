import React from 'react';
import "./App.less";
import { useRoutes } from './routing/routes';

function App() {
    const user = JSON.parse(localStorage.getItem("user")!)
    const routes = useRoutes(user.isAuth, user.role);
    localStorage.setItem("user", JSON.stringify({ role: "user", isAuth: true }))
    return (
        <div className="App">
            {routes}
        </div>
    );
}

export default App;
