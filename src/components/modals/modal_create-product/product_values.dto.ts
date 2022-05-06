import { TValues } from "../../../models/create-values";

export default class ProductDTO {
    title: string;
    price: number;
    categories: Array<{ id: number }>;
    img: string | null;
    constructor(data?: TValues) {
        this.title = data?.title || ''
        this.price = data?.price || 0
        this.categories = data?.categories || []
        this.img = data?.img || null
    }
}