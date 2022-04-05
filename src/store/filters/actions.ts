import { FiltersActionTypes } from './action-types';

export const GetFilters = (search: string, priceRange: Array<number>, category: string) => ({
    type: FiltersActionTypes.SET_FILTERS,
    search,
    priceRange,
    category
})

export const RemoveAllFilters = () => ({
    type: FiltersActionTypes.REMOVE_ALL_FILTERS
})

export const addedCategory = (category: string) => ({
    type: FiltersActionTypes.ADDED_CATEGORY,
    category
})

export const removedCategory = (category: string) => ({
    type: FiltersActionTypes.DELETED_CATEGORY,
    category
})