import { createSelector } from 'reselect';
import { TApplicationState } from './../applicationState';

const stateFilters = (state: TApplicationState) => state.filtersAdmin;

export const selectFiltersAdmin = createSelector(stateFilters, (state) => ({
    searchArticle: state.searchArticle,
    searchStatus: state.searchStatus,
    chooseStatus: state.chooseStatus,
    searchUser: state.searchUser,
    searchNumber: state.searchNumber
}));
