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

export const manufactureFilter = (manufacture: object) => {
    return {
        type: "MANUFACTURE_FILTER",
        manufacture
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