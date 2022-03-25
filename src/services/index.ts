import axios from "axios";
import $api from "../http";
import { TProduct } from "../models/product";

export default class ProductsDB {

    static getAllProducts(page: any, pageSize: any, filters?: any) {
        return $api.post(`/product/search`, {
            page: page - 1,
            pageSize: pageSize,
        })
            .then((req) => req.data)
            .then((products) => products.content.map((product: any) => {
                return {
                    id: product.id,
                    title: product.title,
                    img: product.imgCart,
                    category: product.category,
                    cost: product.price
                }
            }))
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

    _transformProductDatabase = (prod: any) => {
        return {
            id: prod.id,
            img: prod.imgCart,
            title: prod.title,
            category: prod.category,
            price: prod.price
        };
    };
}
