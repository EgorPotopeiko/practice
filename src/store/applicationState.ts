import { RouterState } from "connected-react-router"
import { TFiltersState } from "./filters/reducer"
import { TPaginationState } from "./pagination/reducer"
import { TProductsState } from "./products/reducer"

export type TApplicationState = Readonly<{
    router: RouterState
    products: TProductsState
    pagination: TPaginationState
    filters: TFiltersState
}>