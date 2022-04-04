import { FiltersActionTypes } from './action-types';

export const GetFilters = (search: any, available: any, priceRange: any, sort: any, category: any) => ({
    type: FiltersActionTypes.SET_FILTERS,
    search,
    available,
    priceRange,
    sort,
    category
})

export const RemoveAllFilters = () => ({
    type: FiltersActionTypes.REMOVE_ALL_FILTERS
})

export const addedCategory = (category: any) => ({
    type: FiltersActionTypes.ADDED_CATEGORY,
    category
})

export const removedCategory = (category: any) => ({
    type: FiltersActionTypes.DELETED_CATEGORY,
    category
})