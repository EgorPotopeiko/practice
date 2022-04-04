import { createSelector } from 'reselect';
import { TApplicationState } from './../applicationState';

export const selectAllFilters = (state: TApplicationState) => state.filters;

const stateLogin = (state: TApplicationState) => state.filters;

export const selectFilterSearch = createSelector(stateLogin, (state) => state.search)
export const selectFilterPriceRange = createSelector(stateLogin, (state) => state.priceRange)
export const selectFilterSort = createSelector(stateLogin, (state) => state.sort)
export const selectFilterCategory = createSelector(stateLogin, (state) => state.category)
export const selectUserMenu = createSelector(stateLogin, (state) => state.listCategories)
