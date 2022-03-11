import { Redirect, Route, Switch } from "react-router";
import history from "../history";
import AdminPanel from "../pages/adminPanel/AdminPanel";
import Catalog from "../pages/catalog/catalog";
import ProductPage from "../pages/productPage/ProductPage";
import OrdersList from "../pages/shoppingCart/cart/ordersList/ordersList";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import { AUTH_PATH, PUBLIC_PATH } from "./names"

const { APP, ADMIN } = PUBLIC_PATH;
const { AUTH, CART, ORDERS, PRODUCT } = AUTH_PATH;

export const useRoutes = (isAuth: boolean, role: string, products: Array<Object>) => {
    if (isAuth && role === "user") {
        return (
            <Switch>
                <Route path={AUTH} exact component={Catalog} />
                <Route path={CART} component={ShoppingCart} />
                <Route path={ORDERS} component={OrdersList} />
                <Route path={PRODUCT} render={({ match }) => {
                    const { id } = match.params;
                    const even = (element: any) => element.id === id;
                    const generateProduct = products.find(even);
                    if (generateProduct === undefined) {
                        history.push(AUTH)
                    }
                    else {
                        return <ProductPage itemId={id} product={generateProduct} />
                    }
                }} />
                <Redirect to={AUTH} />
            </Switch>
        )
    }
    if (isAuth && role === "admin") {
        return (
            <Switch>
                <Route path={ADMIN} exact component={AdminPanel} />
                <Redirect to={ADMIN} />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path={APP} exact component={Catalog} />
            <Redirect to={APP} />
        </Switch>
    )
}