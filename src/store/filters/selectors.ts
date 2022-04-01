import { RootStateOrAny } from 'react-redux';

export const selectFilters = (state: RootStateOrAny) => state.filters;
export const selectFilterSearch = (state: RootStateOrAny) => state.filters.search;
export const selectFilterMaker = (state: RootStateOrAny) => state.filters.maker;
export const selectFilterAvailable = (state: RootStateOrAny) => state.filters.available;
export const selectFilterPriceRange = (state: RootStateOrAny) => state.filters.priceRange;
export const selectFilterSort = (state: RootStateOrAny) => state.filters.sort;
export const selectFilterCategory = (state: RootStateOrAny) => state.filters.category;
export const selectUserMenu = (state: RootStateOrAny) => state.filters.listCategories;