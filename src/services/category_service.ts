import $api from '../http';

export default class CategoryDB {

    static getCategories() {
        return $api.get(`/category`)
    }

    static createCategory(title: string) {
        return $api.post(`/category`, {
            title
        })
    }

    static deleteCategory = async (id: number) => {
        return $api.post(`/category/${id}`, {
            id
        })
    };
}
