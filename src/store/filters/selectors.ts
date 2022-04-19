import { createSelector } from 'reselect';
import { TApplicationState } from './../applicationState';

const stateFilters = (state: TApplicationState) => state.filters;

export const selectFilters = createSelector(stateFilters, (state) => ({
    search: state.search,
    price: state.price,
    category: state.category
}));
