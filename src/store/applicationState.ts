import { TLoginState } from './login/reducer';
import { RouterState } from "connected-react-router"
import { TFiltersState } from "./filters/reducer"
import { TProductsState } from "./products/reducer"

export type TApplicationState = Readonly<{
    router: RouterState
    products: TProductsState
    filters: TFiltersState
    login: TLoginState
}>