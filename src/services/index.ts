import $api from "../http";

export default class ProductsDB {

    static getAllProducts(page: any, pageSize: any) {
        return $api.post(`/product/search`, {
            page: page - 1,
            pageSize: pageSize,
            filterData: {}
        })
    }

    static getProducts(page: any, pageSize: any, filters?: any) {
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

    static createProduct = async (product: any) => {
        const { title, prise, category, img } = product
        return $api.post(`/product/create`, {
            title,
            prise,
            category,
            img
        })
    };

    static deleteProduct = async (id: any) => {
        return $api.delete(`/product/delete`, {
            data: { id: id }
        })
    };

}
