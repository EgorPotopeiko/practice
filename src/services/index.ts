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

    getProduct = async (id: number) => {
        const res = await axios.get(`db/products.json`);
        return res.data[id];
    };

    getAllUsers = async () => {
        const res = await axios.get(`db/users.json`);
        return res.data.map(this._transformUser);
    };

    getUser = async (id: number) => {
        const res = await axios.get(`db/users.json`);
        return res.data[id];
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
            category: product.category
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