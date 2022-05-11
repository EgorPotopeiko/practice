import { createSelector } from 'reselect';
import { TApplicationState } from './../applicationState';

const stateCategory = (state: TApplicationState) => state.category;

export const selectListCategories = createSelector(stateCategory, (state) => state.listCategories);
export const selectErrorCategories = createSelector(stateCategory, (state) => state.error);

