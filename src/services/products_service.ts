import { TProduct } from './../models/product';
import { AxiosResponse } from 'axios';
import $api from '../http';
import { ProductResponse } from '../models/product-response';

export default class ProductsDB {

    static getAllProducts(page: any, pageSize: any): Promise<AxiosResponse<ProductResponse>> {
        return $api.post(`/product/search`, {
            page: page - 1,
            pageSize: pageSize,
            filterData: {}
        })
    }

    static getProducts(page: any, pageSize: any, filters?: any): Promise<AxiosResponse<ProductResponse>> {
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

    static getProduct = async (id: any): Promise<AxiosResponse<TProduct>> => {
        return $api.get(`/product/${id}`, {})
    };

    static createProduct = async (product: any): Promise<void> => {
        const { title, price, img, categories } = product;
        return $api.post(`/product`, {
            title,
            price,
            img,
            categories
        })
    };

    static deleteProduct = async (id: any): Promise<void> => {
        return $api.delete(`/product/${id}`)
    };
}
