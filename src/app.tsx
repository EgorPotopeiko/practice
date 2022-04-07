/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './app.less';
import { useRoutes } from './routing/routes';
import { selectListCategories } from './store/category/selectors';
import { selectUser } from './store/login/selectors';

function App() {
    const user = useSelector(selectUser);
    const routes = useRoutes(user.isAuth, user.role);
    const listCategories = useSelector(selectListCategories);
    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(listCategories))
    }, [listCategories]);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user]);
    return (
        <div className="App">
            {routes}
        </div>
    );
}

export default App;