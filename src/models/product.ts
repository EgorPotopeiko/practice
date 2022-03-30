export type TProduct = {
    key: string,
    id: string,
    title: string,
    description: string,
    price: number,
    available: boolean,
    maker: string,
    category: string,
    subcategory?: string,
    status?: string,
    img: string
}