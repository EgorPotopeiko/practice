/* eslint-disable array-callback-return */
import { createSelector } from 'reselect';
import { RootStateOrAny } from 'react-redux';
import { TProduct } from '../../models/product';

const selectProducts = (state: RootStateOrAny) => state.productsReducer.products;

export const selectItemsBySearch = createSelector(
    [
        (selectProducts),
        (state: RootStateOrAny, search: string) => search,
    ],
    (items, search) => items.filter((item: TProduct) => item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
);

export const selectItemsByCategory = createSelector(
    [
        (selectProducts),
        (state: RootStateOrAny, category: string) => category,
    ],
    (items, category) => items.filter((item: TProduct) => item.category === category)
);

export const selectItemsSorting = createSelector(
    [
        (selectProducts),
        (state: RootStateOrAny, sort: string) => sort,
    ],
    (items, sort) => items.sort(function (a: TProduct, b: TProduct) {
        if (sort === "DATE") { return new Date(b.added_date).valueOf() - new Date(a.added_date).valueOf() }
        if (sort === "ALPHABET") { if (a.title < b.title) { return -1 } }
        if (sort === "HIGH_PRICE") { return b.cost - a.cost }
        if (sort === "LOW_PRICE") { return a.cost - b.cost }
    })
);

export const selectItemsByMaker = createSelector(
    [
        (selectProducts),
        (state: RootStateOrAny, maker: string) => maker,
    ],
    (items, maker) => items.filter((item: TProduct) => maker.includes(item.maker))
);

export const selectItemsByAvailable = createSelector(
    [
        (selectProducts),
        (state: RootStateOrAny, available: boolean) => available,
    ],
    (items, available) => items.filter((item: TProduct) => available === true ? item.available === true : item.available === false)
);

export const selectItemsByPrice = createSelector(
    [
        (selectProducts),
        (state: RootStateOrAny, priceRange: Array<Number>) => priceRange,
    ],
    (items, priceRange) => items.filter((item: TProduct) => item.cost >= priceRange[0] && item.cost <= priceRange[1])
);