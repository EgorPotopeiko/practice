import { TRoutes } from '../models/routes';
import AdminPanel from '../pages/admin_panel';
import Catalog from '../pages/catalog/catalog';
import ProductPage from '../pages/product_page';
import OrdersList from '../pages/shopping_cart/cart/orders_list';
import ShoppingCart from '../pages/shopping_cart';
import { USER_PATH, PUBLIC_PATH, ADMIN_PATH } from './names';

const { APP } = PUBLIC_PATH;
const { AUTH, CART, ORDERS, PRODUCT } = USER_PATH;
const { ADMIN } = ADMIN_PATH;

export const userRoutes: TRoutes[] = [
    { path: AUTH, Component: Catalog, name: 'Пользователь', exact: true },
    { path: PRODUCT, Component: ProductPage, name: 'Страница товара' },
    { path: CART, Component: ShoppingCart, name: 'Корзина покупок' },
    { path: ORDERS, Component: OrdersList, name: 'Список заказов' }
]

export const adminRoutes: TRoutes[] = [
    { path: ADMIN, Component: AdminPanel, name: 'Администратор', exact: true }
]

export const guestRoutes: TRoutes[] = [
    { path: APP, Component: Catalog, name: 'Гость', exact: true }
]
export type TRoutesHook = {
    routes: TRoutes[],
    redirect: string
}
export const useRoutes = (isAuth: boolean, role: string): TRoutesHook => {
    if (isAuth && role.toLowerCase() === "user") {
        return {routes: userRoutes, redirect: USER_PATH.AUTH}
    }
    if (isAuth && role.toLowerCase() === "admin") {
        return {routes: adminRoutes, redirect: ADMIN_PATH.ADMIN}
    }
    return {routes: guestRoutes, redirect: PUBLIC_PATH.APP}
}