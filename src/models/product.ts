import { TCategory } from "./category"

export type TProduct = {
    key?: string,
    id: string,
    title: string,
    price: number,
    categories: Array<TCategory>,
    status?: string,
    img: string
}