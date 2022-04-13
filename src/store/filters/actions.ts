import { FiltersActionTypes } from './action-types';

export const GetFilters = (search: string, price: Array<number>, category: string) => ({
    type: FiltersActionTypes.SET_FILTERS,
    search,
    price,
    category
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