import { RootStateOrAny } from 'react-redux';

export const selectProducts = (state: RootStateOrAny) => state.products.products;
export const selectProductsLoading = (state: RootStateOrAny) => state.products.isLoading;
export const selectPage = (state: RootStateOrAny) => state.products.page;
export const selectPageSize = (state: RootStateOrAny) => state.products.pageSize;