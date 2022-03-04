import { TUser } from './../models/user';
import { TProduct } from './../models/product';
import axios from "axios";

export default class ProductsDB {
    api = axios.create({
        baseURL: "http://localhost:3000/"
    });

    getAllProducts = async () => {
        const res = await axios.get(`db/products.json`);
        return res.data.map(this._transformProduct);
    };

    getProduct = async (id: string) => {
        const even = (element: TProduct) => element.id === id;
        const res = await axios.get(`db/products.json`);
        const data = res.data.map(this._transformProduct);
        const findProduct = data.find(even);
        return findProduct;
    };

    getAllUsers = async () => {
        const res = await axios.get(`db/users.json`);
        return res.data.map(this._transformUser);
    };

    getUser = async (id: string) => {
        const even = (element: TUser) => element.id === id;
        const res = await axios.get(`db/users.json`);
        const data = res.data.map(this._transformUser);
        const verifyUser = data.find(even);
        return verifyUser
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
            subcategory: product.subcategory
        };
    };

    _transformUser = (user: TUser) => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            role: user.role
        };
    };
}
