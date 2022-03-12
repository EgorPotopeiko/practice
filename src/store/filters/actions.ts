export const searchFilter = (search: string) => {
    return {
        type: "SEARCH_FILTER",
        search
    };
};

export const categoryFilter = (category: string) => {
    return {
        type: "CATEGORY_FILTER",
        category
    }
}

export const sortingFilter = (sort: string) => {
    return {
        type: "SORTING_FILTER",
        sort
    }
}

export const makerFilter = (maker: string) => {
    return {
        type: "MAKER_FILTER",
        maker
    }
}

export const availableFilter = (available: boolean) => {
    return {
        type: "AVAILABLE_FILTER",
        available
    }
}

export const priceFilter = (priceRange: Array<Number>) => {
    return {
        type: "PRICE_FILTER",
        priceRange
    }
}

export const removeAllFilters = () => {
    return {
        type: "REMOVE_FILTERS",
    }
}

export const addedCategory = (category: any) => {
    return {
        type: "ADDED_CATEGORY",
        category
    }
}

export const removedCategory = (category: any) => {
    return {
        type: "REMOVED_CATEGORY",
        category,
    }
}
