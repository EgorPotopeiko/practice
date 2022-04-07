import { TModalsState } from './modals/reducer';
import { TCartState } from './cart/reducer';
import { TLoginState } from './login/reducer';
import { RouterState } from 'connected-react-router';
import { TFiltersState } from './filters/reducer';
import { TProductsState } from './products/reducer';

export type TApplicationState = Readonly<{
    router: RouterState,
    products: TProductsState,
    filters: TFiltersState,
    login: TLoginState,
    cart: TCartState,
    modals: TModalsState
}>