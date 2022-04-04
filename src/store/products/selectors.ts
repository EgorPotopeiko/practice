import { RootStateOrAny } from 'react-redux';

export const selectProducts = (state: RootStateOrAny) => state.products.products;
export const selectProduct = (state: RootStateOrAny) => state.products.product;
export const selectProductsLoading = (state: RootStateOrAny) => state.products.isLoading;
export const selectPage = (state: RootStateOrAny) => state.products.page;
export const selectPageSize = (state: RootStateOrAny) => state.products.pageSize;
export const selectTotal = (state: RootStateOrAny) => state.products.totalCount;