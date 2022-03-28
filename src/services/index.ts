import $api from "../http";

export default class ProductsDB {

    static getAllProducts(page: any, pageSize: any, filters?: any) {
        return $api.post(`/product/search`, {
            page: page - 1,
            pageSize: pageSize,
            filterData: {
                searchString: filters.search,
                category: filters.category === "all" ? [] : [filters.category],
                price: filters.priceRange
            }
        })
    }

    static getProduct = async (id: any) => {
        return $api.post(`/product/product`, {
            id
        })
    };
}
