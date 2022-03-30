export type TProduct = {
    key: string,
    id: string,
    title: string,
    description: string,
    price: number,
    available: boolean,
    added_date: string,
    maker: string,
    category: string,
    subcategory?: string,
    status?: string,
    img: string
}