import { FiltersActionTypes } from "./action-types"

export const GetFilters = (search: any, maker: any, available: any, priceRange: any) => ({
    type: FiltersActionTypes.SET_FILTERS,
    search,
    maker,
    available,
    priceRange
})