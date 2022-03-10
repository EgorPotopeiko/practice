export type TProduct = {
    id: string,
    title: string,
    description: string,
    cost: number,
    available: boolean,
    added_date: string,
    maker: string,
    category: string,
    subcategory?: string
}