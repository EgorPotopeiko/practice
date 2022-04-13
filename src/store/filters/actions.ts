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

export const addedCategory = (category: string) => ({
    type: FiltersActionTypes.ADDED_CATEGORY,
    category
})

export const deletedCategory = (category: string) => ({
    type: FiltersActionTypes.DELETED_CATEGORY,
    category
})