import React from 'react';
import { useSelector } from 'react-redux';
import "./App.less";
import { useRoutes } from './routing/routes';
import { selectUser } from './store/login/selectors';

function App() {
    const user = useSelector(selectUser)
    const routes = useRoutes(user.isAuth, user.role);
    return (
        <div className="App">
            {routes}
        </div>
    );
}

export default App;
