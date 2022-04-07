import { RootStateOrAny } from 'react-redux';
import { createSelector } from 'reselect';
import { TApplicationState } from '../applicationState';

const stateProducts = (state: TApplicationState) => state.products;

export const selectProducts = (state: RootStateOrAny) => state.products.products;
export const selectProduct = createSelector(stateProducts, (state) => state.product)
export const selectProductsLoading = createSelector(stateProducts, (state) => state.isLoading)
export const selectPage = createSelector(stateProducts, (state) => state.page)
export const selectPageSize = createSelector(stateProducts, (state) => state.pageSize)
export const selectTotal = createSelector(stateProducts, (state) => state.totalCount)
export const selectView = createSelector(stateProducts, (state) => state.view)
