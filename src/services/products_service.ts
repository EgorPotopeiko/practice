import $api from '../http';

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
            totalCount: 100,
            page: page - 1,
            pageSize: pageSize,
            filterData: {
                searchString: filters.search,
                category: filters.category,
                // price: filters.price
            }
        })
    }

    static getProduct = async (id: any) => {
        return $api.get(`/product/${id}`, {})
    };

    static createProduct = async (product: any) => {
        console.log(product)
        const { title, price, img, categories } = product;
        return $api.post(`/product`, {
            title,
            price,
            img,
            categories
        })
    };

    static deleteProduct = async (id: any) => {
        return $api.delete(`/product/delete`, {
            data: { id: id }
        })
    };

}
