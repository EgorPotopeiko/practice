import { createSelector } from 'reselect';
import { TApplicationState } from './../applicationState';

const stateLogin = (state: TApplicationState) => state.filters;

export const selectAllFilters = createSelector(stateLogin, (state) => state);
export const selectFilterSearch = createSelector(stateLogin, (state) => state.search)
export const selectFilterPriceRange = createSelector(stateLogin, (state) => state.priceRange)
export const selectFilterCategory = createSelector(stateLogin, (state) => state.category)
export const selectUserMenu = createSelector(stateLogin, (state) => state.listCategories)
