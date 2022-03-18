import { Redirect, Route, Switch } from "react-router";
import { TRoutes } from "../models/routes";
import AdminPanel from "../pages/adminPanel/AdminPanel";
import Catalog from "../pages/catalog/catalog";
import OrdersList from "../pages/shoppingCart/cart/ordersList/ordersList";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import { USER_PATH, PUBLIC_PATH, ADMIN_PATH } from "./names"

const { APP } = PUBLIC_PATH;
const { AUTH, CART, ORDERS } = USER_PATH;
const { ADMIN } = ADMIN_PATH;

export const userRoutes: TRoutes[] = [
    { path: AUTH, Component: Catalog, name: 'Пользователь', exact: true },
    { path: CART, Component: ShoppingCart, name: 'Корзина покупок' },
    { path: ORDERS, Component: OrdersList, name: 'Список заказов' },
]

export const adminRoutes: TRoutes[] = [
    { path: ADMIN, Component: AdminPanel, name: 'Администратор', exact: true },
]

export const guestRoutes: TRoutes[] = [
    { path: APP, Component: Catalog, name: 'Гость', exact: true },
]

export const useRoutes = (isAuth: boolean, role: string) => {
    if (isAuth && role === "user") {
        return (
            <Switch>
                {userRoutes.map(({
                    path,
                    Component,
                    exact = true }) => (
                    <Route key={path} path={path} component={Component} strict exact={exact}></Route>
                ))}
                <Redirect to={AUTH} />
            </Switch>
        )
    }
    if (isAuth && role === "admin") {
        return (
            <Switch>
                {adminRoutes.map(({
                    path,
                    Component,
                    exact = true }) => (
                    <Route key={path} path={path} component={Component} strict exact={exact}></Route>
                ))}
                <Redirect to={ADMIN} />
            </Switch>
        )
    }
    return (
        <Switch>
            {guestRoutes.map(({
                path,
                Component,
                exact = true }) => (
                <Route key={path} path={path} component={Component} strict exact={exact}></Route>
            ))}
            <Redirect to={APP} />
        </Switch>
    )
}