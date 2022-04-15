/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './app.less';
import { useRoutes } from './routing/routes';
import { GetRefreshStartAction } from './store/login/actions';
import { selectAuth, selectUser } from './store/login/selectors';

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isAuth = useSelector(selectAuth);
    const routes = useRoutes(isAuth, user.role);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(GetRefreshStartAction())
        }
    }, [])
    return (
        <div className="App">
            {routes}
        </div>
    );
}

export default App;