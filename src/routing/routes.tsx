import { TRoutes } from '../models/routes';
import AdminPanel from '../pages/admin_panel';
import Catalog from '../pages/catalog/catalog';
import ProductPage from '../pages/product_page';
import OrdersList from '../pages/shopping_cart/cart/orders_list';
import ShoppingCart from '../pages/shopping_cart';
import { USER_PATH, PUBLIC_PATH, ADMIN_PATH } from './names';

export const userRoutes: TRoutes[] = [
    { path: USER_PATH.AUTH, Component: Catalog, name: 'Пользователь', exact: true },
    { path: USER_PATH.PRODUCT, Component: ProductPage, name: 'Страница товара' },
    { path: USER_PATH.CART, Component: ShoppingCart, name: 'Корзина покупок' },
    { path: USER_PATH.ORDERS, Component: OrdersList, name: 'Список заказов' }
]

export const adminRoutes: TRoutes[] = [
    { path: ADMIN_PATH.ADMIN, Component: AdminPanel, name: 'Администратор', exact: true }
]

export const guestRoutes: TRoutes[] = [
    { path: PUBLIC_PATH.APP, Component: Catalog, name: 'Гость', exact: true }
]
export type TRoutesHook = {
    routes: TRoutes[],
    redirect: string
}
export const useRoutes = (isAuth: boolean, role: string): TRoutesHook => {
    if (isAuth && role.toLowerCase() === "user") {
        return { routes: userRoutes, redirect: USER_PATH.AUTH }
    }
    if (isAuth && role.toLowerCase() === "admin") {
        return { routes: adminRoutes, redirect: ADMIN_PATH.ADMIN }
    }
    return { routes: guestRoutes, redirect: PUBLIC_PATH.APP }
}