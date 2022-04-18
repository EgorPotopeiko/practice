import { TFilters } from './../models/filters';
import { TProduct } from './../models/product';
import { AxiosResponse } from 'axios';
import $api from '../http';
import { ProductResponse } from '../models/product-response';

export default class ProductsDB {

    static getAllProducts(page: number, pageSize: number): Promise<AxiosResponse<ProductResponse>> {
        return $api.post(`/product/search`, {
            page: page - 1,
            pageSize: pageSize,
            filterData: {}
        })
    };

    static getProducts(page: number, pageSize: number, filters?: TFilters): Promise<AxiosResponse<ProductResponse>> {
        return $api.post(`/product/search`, {
            totalCount: 100,
            page: page - 1,
            pageSize: pageSize,
            filterData: {
                searchString: filters?.search,
                category: filters?.category,
                // price: filters.price
            }
        })
    };

    static getProduct = async (id: number): Promise<AxiosResponse<TProduct>> => {
        return $api.get(`/product/${id}`, {})
    };

    static createProduct = async (product: TProduct): Promise<void> => {
        const { title, price, img, categories } = product;
        return $api.post(`/product`, {
            title,
            price,
            img,
            categories
        })
    };

    static deleteProduct = async (id: number): Promise<void> => {
        return $api.delete(`/product/${id}`)
    };
}
