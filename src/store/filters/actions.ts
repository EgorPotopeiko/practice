import { FiltersActionTypes } from './action-types';

export const GetFilters = (search: string, price: Array<number>, categories: Array<number>) => ({
    type: FiltersActionTypes.SET_FILTERS,
    search,
    price,
    categories
})

export const RemoveAllFilters = () => ({
    type: FiltersActionTypes.REMOVE_ALL_FILTERS
})