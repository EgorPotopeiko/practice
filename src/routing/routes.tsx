import { Redirect, Route, Switch } from "react-router";
import AdminPanel from "../pages/adminPanel/AdminPanel";
import Catalog from "../pages/catalog/catalog";
import { PUBLIC_PATH } from "./names"

const { APP, ADMIN, AUTH } = PUBLIC_PATH;

export const useRoutes = (isAuth: boolean, role: string) => {
    if (isAuth && role === "user") {
        return (
            <Switch>
                <Route path={AUTH} exact component={Catalog} />
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