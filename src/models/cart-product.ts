import { TCategory } from './category';

export type TCartProduct = {
    id: string,
    title: string,
    categories: Array<TCategory>,
    price: number,
    img: string,
    amount?: number,
    total?: number
}