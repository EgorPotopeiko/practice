import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from "react-router";
import { useRoutes } from './routing/routes';
import { GetRefreshStartAction } from './store/login/actions';
import { selectUserStatus } from './store/login/selectors';
import './app.less';

const App: React.FC = () => {
    const { user, isAuth } = useSelector(selectUserStatus);
    const dispatch = useDispatch();
    const routes = useRoutes(isAuth, user.role);
    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(GetRefreshStartAction())
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [])
    return (
        <div className="App">
            <Switch>
                {routes.routes.map(({
                    path,
                    Component,
                    exact = true }) => (
                    <Route
                        key={path}
                        path={path}
                        component={Component}
                        strict
                        exact={exact} />
                ))}
                <Redirect to={routes.redirect} />
            </Switch>
        </div>
    );
}

export default App;