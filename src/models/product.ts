import { TCategory } from "./category"

export type TProduct = {
    key?: string,
    id: number,
    title: string,
    price: number,
    categories: Array<TCategory>,
    img: string
}