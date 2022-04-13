import { createSelector } from 'reselect';
import { TApplicationState } from './../applicationState';

const stateLogin = (state: TApplicationState) => state.filters;

export const selectAllFilters = createSelector(stateLogin, (state) => state);
export const selectFilterSearch = createSelector(stateLogin, (state) => state.search);
export const selectFilterPrice = createSelector(stateLogin, (state) => state.price);
export const selectFilterCategory = createSelector(stateLogin, (state) => state.category);
