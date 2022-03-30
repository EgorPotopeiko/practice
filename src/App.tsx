import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./App.less";
import { useRoutes } from './routing/routes';
import { selectUserMenu } from './store/filters/selectors';
import { selectUser } from './store/login/selectors';

function App() {
    const user = useSelector(selectUser)
    const routes = useRoutes(user.isAuth, user.role);
    const listCategories = useSelector(selectUserMenu)
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
