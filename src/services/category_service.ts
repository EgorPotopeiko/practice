import { TCategory } from './../models/category';
import { AxiosResponse } from 'axios';
import $api from '../http';

export default class CategoryDB {

    static getCategories(): Promise<void> {
        return $api.get(`/category`)
    };

    static createCategory(title: string): Promise<AxiosResponse<TCategory>> {
        return $api.post(`/category`, {
            title
        })
    };

    static deleteCategory = async (id: number): Promise<void> => {
        return $api.delete(`/category/${id}`)
    };
}
