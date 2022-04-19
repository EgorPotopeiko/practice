import { createSelector } from 'reselect';
import { TApplicationState } from '../applicationState';

const stateProducts = (state: TApplicationState) => state.products;

export const selectProduct = createSelector(stateProducts, (state) => state.product);
export const selectTotal = createSelector(stateProducts, (state) => state.totalCount);
export const selectView = createSelector(stateProducts, (state) => state.view);

export const selectProductsStatus = createSelector(stateProducts, (state) => ({
    products: state.products,
    isLoading: state.isLoading,
    error: state.error
}));

export const selectPageStatus = createSelector(stateProducts, (state) => ({
    page: state.page,
    pageSize: state.pageSize,
}));