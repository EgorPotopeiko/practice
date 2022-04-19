import { TCategory } from './category';

export type TCartProduct = {
    key?: number,
    id: number,
    title: string,
    price: number,
    categories: Array<TCategory>
}