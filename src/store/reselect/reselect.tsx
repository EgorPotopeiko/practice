/* eslint-disable array-callback-return */
import { createSelector } from 'reselect';
import { RootStateOrAny } from 'react-redux';
import { TProduct } from '../../models/product';

export const selectItemsBySearch = createSelector(
    [
        ((state: RootStateOrAny) => state.productsReducer.products),
        (state: RootStateOrAny, search: string) => search,
    ],
    (items, search) => items.filter((item: TProduct) => item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
);

export const selectItemsByCategory = createSelector(
    [
        ((state: RootStateOrAny) => state.filterReducer.filterCategory),
        (state: RootStateOrAny, category: string) => category,
    ],
    (items, category) => items.filter((item: TProduct) => item.category === category)
);

export const selectItemsSorting = createSelector(
    [
        ((state: RootStateOrAny) => state.filterReducer.filterSorting),
        (state: RootStateOrAny, sort: string) => sort,
    ],
    (items, sort) => items.sort(function (a: TProduct, b: TProduct) {
        if (sort === "DATE") { return new Date(b.added_date).valueOf() - new Date(a.added_date).valueOf() }
        if (sort === "ALPHABET") { if (a.title < b.title) { return -1 } }
        if (sort === "HIGH_PRICE") { return b.cost - a.cost }
        if (sort === "LOW_PRICE") { return a.cost - b.cost }
    })
);