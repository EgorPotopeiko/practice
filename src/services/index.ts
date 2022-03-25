import axios from "axios";
import $api from "../http";
import { TProduct } from "../models/product";

export default class ProductsDB {

    static getAllProductWithDatabase() {
        return $api.post(`/product/search`, {
            page: 0,
            pageSize: 40
        })
    }

    getAllProducts = async () => {
        const res = await axios.get(`http://localhost:3000/db/generated.json`);
        return res.data.map(this._transformProduct);
    };

    getProduct = async (id: any) => {
        const even = (element: TProduct) => element.id === id;
        const res = await axios.get(`http://localhost:3000/db/generated.json`);
        const data = res.data.map(this._transformProduct);
        const findProduct = await data.find(even);
        return findProduct;
    };

    _transformProduct = (product: TProduct) => {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            cost: product.cost,
            available: product.available,
            date: product.added_date,
            maker: product.maker,
            category: product.category,
            subcategory: product.subcategory,
            img: product.img
        };
    };
}
